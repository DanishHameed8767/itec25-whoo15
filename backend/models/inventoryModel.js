const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  userId: String,
  ingredients: [
    {
      ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient",required:true },
      quantity: Number,
      expiryDate: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Automatically 5 days from now
      },
    },
  ],
});

exports.Inventory = mongoose.model("UserInventory", inventorySchema);
