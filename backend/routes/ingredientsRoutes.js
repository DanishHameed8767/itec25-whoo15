const express = require("express");
const { Ingredient } = require("../models/ingredientModel");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", async (req, res) => {
  const ingredients = await Ingredient.find();
  res.json(ingredients);
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Ingredient name is required" });

    const existingIngredient = await Ingredient.findOne({ name });
    if (existingIngredient)
      return res.status(400).json({ message: "Ingredient already exists" });

    const ingredient = new Ingredient({ name });
    await ingredient.save();
    res
      .status(201)
      .json({ message: "Ingredient created successfully", ingredient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
