import { useContext, useEffect, useState } from "react";
import RecipeCard from "./RecipesItem"; // Import RecipeCard component
import { PantryContext } from "../../store/pantryContext";

const RecipesList = () => {
  // Sample list of recipes
  const { recipes, fetchRecipesByInventory, selectRecipe } = useContext(PantryContext);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  console.log(recipes);
  // Function to handle selecting a recipe
  const handleSelectRecipe = (id) => {
    selectRecipe(id);
    setSelectedRecipe(id);

  };
  useEffect(() => {
    fetchRecipesByInventory();
  }, [])
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Recipe List</h2>
      <div className="row">
        {recipes.map((recipeData) => (
          <div key={recipeData._id} className="col-md-4 mb-3">
            <RecipeCard
              recipeData={recipeData}
              isSelected={recipeData._id === selectedRecipe}
              onSelect={()=>handleSelectRecipe(recipeData._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
