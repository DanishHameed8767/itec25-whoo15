const express = require("express");
const { Inventory } = require("../models/inventoryModel");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  const { ingredients } = req.body;
  const userId = req.user.id;
  let inventory = await Inventory.findOne({ userId });

  if (!inventory) inventory = new Inventory({ userId, ingredients: [] });

  ingredients.forEach(({ ingredientId, quantity }) => {
    const item = inventory.ingredients.find((i) =>
      i.ingredientId.equals(ingredientId)
    );
    if (item) item.quantity += quantity;
    else inventory.ingredients.push({ ingredientId, quantity });
  });
  try {
    await inventory.save();
    res.status(201).json({ message: "Inventory updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const inventory = await Inventory.findOne({
    userId: req.user.id,
  }).populate("ingredients.ingredientId");
  res.json(inventory);
});
module.exports = router;
