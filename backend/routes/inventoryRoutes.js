const express = require("express");
const { Inventory } = require("../models/inventoryModel");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { ingredients } = req.body;
    const userId = req.user.id;
    let inventory = await Inventory.findOne({ userId });

    if (!inventory) inventory = new Inventory({ userId, ingredients: [] });

    ingredients.forEach(({ ingredientId, quantity }) => {
      const existingItem = inventory.ingredients.find((i) =>
        i.ingredientId.equals(ingredientId)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        inventory.ingredients.push({
          ingredientId,
          quantity,
          expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        });
      }
    });

    await inventory.save();
    res.json({ message: "Inventory updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      userId: req.user.id,
    }).populate("ingredients.ingredientId", "name");

    if (!inventory)
      return res.status(404).json({ message: "No inventory found" });

    // Ensure all ingredients have a valid name
    const formattedInventory = {
      ...inventory.toObject(),
      ingredients: inventory.ingredients
        .map((item) => ({
          ingredientId: item.ingredientId._id,
          name: item.ingredientId.name, // Include name
          quantity: item.quantity,
        })),
    };
    console.log(formattedInventory);
    res.json(formattedInventory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;
