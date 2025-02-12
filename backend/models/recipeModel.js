const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [
    {
      ingredientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      },
      quantity: Number,
    },
  ],
});
exports.Recipe = mongoose.model("Recipe", recipeSchema);
