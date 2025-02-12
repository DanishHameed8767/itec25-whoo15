import React, { useState } from "react";
import IngredientCard from "./IngredientItem"; // Import the IngredientCard component

const IngredientList = () => {
  // Sample list of kitchen ingredients
  const [ingredients, setIngredients] = useState([
    { id: 1, title: "Tomato", expiryDate: "2025-03-10" },
    { id: 2, title: "Onion", expiryDate: "2025-02-20" },
    { id: 3, title: "Garlic", expiryDate: "2025-04-15" },
    { id: 4, title: "Milk", expiryDate: "2025-02-18" },
  ]);

  // Function to remove an ingredient
  const handleRemove = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kitchen Ingredients</h2>
      <div className="row">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="col-md-4 mb-3">
            <IngredientCard ingredient={ingredient} onRemove={handleRemove} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
