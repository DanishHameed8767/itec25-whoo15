import { useContext, useEffect } from "react";
import InventoryItem from "./InventoryItem";
import { PantryContext } from "../../store/pantryContext";

export default function InventoryList() {
  const { inventory, fetchInventory, deleteInventoryItem } = useContext(PantryContext);

  console.log(inventory);
  useEffect(() => {
    fetchInventory(); // Fetch inventory from the backend
  }, []);

  // Remove ingredient from inventory
  const handleRemove = async (ingredientId) => {
    try {
      await deleteInventoryItem( ingredientId); // Call API to delete
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kitchen inventory</h2>
      <div className="row">
        {inventory.length > 0 ? (
          inventory.map((ingredient) => (
            <div key={ingredient.ingredientId} className="col-md-4 mb-3">
              <InventoryItem ingredient={ingredient} onRemove={() => handleRemove(ingredient.ingredientId)} />
            </div>
          ))
        ) : (
          <p className="text-center">No inventory available.</p>
        )}
      </div>
    </div>
  );
};

