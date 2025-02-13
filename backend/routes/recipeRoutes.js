const express = require("express");
const { Recipe } = require("../models/recipeModel");
const { Inventory } = require("../models/inventoryModel");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/recipes", authMiddleware, async (req, res) => {
  const inventory = await Inventory.findOne({ userId: req.user.id }).populate("ingredients.ingredientId", "name");;
  if (!inventory) return res.json([]);
  const recipes = await Recipe.find();
  // const availableRecipes = recipes.filter((recipe) =>
  //   recipe.ingredients.every((ri) => {
  //     const userItem = inventory.ingredients.find((ui) =>
  //       ui.ingredientId.equals(ri.ingredientId)
  //     );
  //     return userItem && userItem.quantity >= ri.quantity;
  //   })
  // );
  res.json(recipes);
});

router.get("/user/recipes", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user's inventory
    const userInventory = await Inventory.findOne({ userId });

    if (!userInventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    // Extract ingredient IDs from user's inventory
    const userIngredientIds = userInventory.ingredients.map(
      (ing) => ing.ingredientId
    );

    // Find recipes where at least one ingredient matches user's inventory
    const matchedRecipes = await Recipe.find({
      "ingredients.ingredientId": { $in: userIngredientIds },
    }).populate("ingredients.ingredientId", "name"); // Populate ingredientId with name

    res.json({ recipes: matchedRecipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post("/recipes/select/:id", authMiddleware, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  const inventory = await Inventory.findOne({ userId: req.user.id });
  if (!inventory)
    return res.status(400).json({ message: "No inventory found" });
  const canPrepare = recipe.ingredients.every((ri) => {
    const userItem = inventory.ingredients.find((ui) =>
      ui.ingredientId.equals(ri.ingredientId)
    );
    if (userItem) {
      return userItem && userItem.quantity >= ri.quantity;
    }
  });
  if (!canPrepare)
    return res.status(400).json({ message: "Not enough ingredients" });
  recipe.ingredients.forEach((ri) => {
    const userItem = inventory.ingredients.find((ui) =>
      ui.ingredientId.equals(ri.ingredientId)
    );
    console.log(userItem);
    if (userItem) {
      userItem.quantity -= ri.quantity;
    }
  });
  await inventory.save();
  res.json({ message: "Recipe prepared, ingredients updated" });
});

router.post("/recipes", async (req, res) => {
  try {
    const { name, description, ingredients } = req.body;

    // Validate request body
    if (
      !name ||
      !description ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({
        message:
          "Invalid input. Name, description, and ingredients are required.",
      });
    }

    // Check if recipe already exists
    const existingRecipe = await Recipe.findOne({ name });
    if (existingRecipe) {
      return res.status(400).json({ message: "Recipe already exists" });
    }

    // Create new recipe
    const newRecipe = new Recipe({
      name,
      description,
      ingredients, // Should contain ingredientId and quantity
    });

    await newRecipe.save();

    res
      .status(201)
      .json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
