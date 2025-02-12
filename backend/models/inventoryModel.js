const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  userId: String,
  ingredients: [
    { ingredientId: mongoose.Schema.Types.ObjectId, quantity: Number },
  ],
});
exports.Inventory = mongoose.model("UserInventory", inventorySchema);
