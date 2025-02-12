const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema({ name: String });
exports.Ingredient = mongoose.model("Ingredient", ingredientSchema);
