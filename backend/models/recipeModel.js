const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: [{ ingredientId: mongoose.Schema.Types.ObjectId, quantity: Number }]
});
exports.Recipe = mongoose.model('Recipe', recipeSchema);