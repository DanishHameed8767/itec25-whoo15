import React, { useState } from "react";
import RecipeCard from "./RecipesItem"; // Import RecipeCard component

const RecipesList = () => {
  // Sample list of recipes
  const [recipes] = useState([
    { id: 1, title: "Spaghetti Bolognese", description: "A classic Italian pasta dish with a rich and savory meat sauce..." },
    { id: 2, title: "Chicken Curry", description: "A flavorful and spicy Indian-inspired curry made with tender chicken pieces..." },
    { id: 3, title: "Vegetable Stir Fry", description: "A quick and healthy stir-fry packed with colorful vegetables and soy sauce..." },
    { id: 4, title: "Pancakes", description: "Fluffy homemade pancakes, perfect for a delicious breakfast treat..." },
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Function to handle selecting a recipe
  const handleSelectRecipe = (id) => {
    setSelectedRecipe(id);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Recipe List</h2>
      <div className="row">
        {recipes.map((recipeData) => (
          <div key={recipeData.id} className="col-md-4 mb-3">
            <RecipeCard 
              recipeData={recipeData} 
              isSelected={recipeData.id === selectedRecipe}
              onSelect={handleSelectRecipe} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
