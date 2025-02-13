import { useContext, useEffect } from "react";
import IngredientCard from "./IngredientItem";
import { PantryContext } from "../../store/pantryContext";

export default function IngredientList() {
  const { ingredients, fetchIngredients, addInventoryItem } = useContext(PantryContext);

  useEffect(() => {
    fetchIngredients(); // Fetch inventory from the backend
  }, []);

  // Remove ingredient from inventory
  const handleAdd = async (ingredientId) => {
    try {
      const quantity = 10;
      await addInventoryItem(ingredientId, quantity); // Call API to delete
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kitchen inventory</h2>
      <div className="row">
        {ingredients.length > 0 ? (
          ingredients.map((ingredient) => (
            <div key={ingredient._id} className="col-md-4 mb-3">
              <IngredientCard ingredient={ingredient} onAdd={() => handleAdd(ingredient._id)} />
            </div>
          ))
        ) : (
          <p className="text-center">No inventory available.</p>
        )}
      </div>
    </div>
  );
};

