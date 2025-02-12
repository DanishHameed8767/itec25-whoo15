import { useContext, useEffect } from "react";
import IngredientCard from "./InventoryItem";
import { PantryContext } from "../../store/pantryContext";

export default function IngredientList() {
  const { inventory, fetchInventory, deleteInventoryItem } = useContext(PantryContext);

  useEffect(() => {
    fetchInventory("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWNhOWVlZjA3ZjEwYTdkNjBiMzdhZCIsImlhdCI6MTczOTM4NzI5MywiZXhwIjoxNzM5MzkwODkzfQ.gdkmoqmjd8zUwruEXzhnRW9PpKqmIe7__Z4UDdD6G5c"); // Fetch inventory from the backend
  }, []);

  // Remove ingredient from inventory
  const handleRemove = async (ingredientId) => {
    try {
      await deleteInventoryItem(ingredientId); // Call API to delete
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kitchen inventory</h2>
      <div className="row">
        {inventory.length > 0 ? (
          inventory.map((ingredient) => (
            <div key={ingredient._id} className="col-md-4 mb-3">
              <IngredientCard ingredient={ingredient} onRemove={() => handleRemove(ingredient._id)} />
            </div>
          ))
        ) : (
          <p className="text-center">No inventory available.</p>
        )}
      </div>
    </div>
  );
};

