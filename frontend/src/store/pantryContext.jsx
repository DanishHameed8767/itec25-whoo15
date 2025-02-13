import { createContext, useReducer } from "react";
import pantryReducer from "./pantryReducer";

// Initial State
const initialState = {
  ingredients: [],
  inventory: [],
  recipes: [],
};

// Create Context
export const PantryContext = createContext(initialState);

// Provider Component
export const PantryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pantryReducer, initialState);

  // API Base URL
  const API_URL = import.meta.env.VITE_API_URL;

  // Helper function to get the token
  const getToken = () => localStorage.getItem("token");

  // 📌 Fetch All Ingredients
  const fetchIngredients = async () => {
    try {
      const res = await fetch(`${API_URL}/ingredients`);
      const data = await res.json();
      dispatch({ type: "SET_INGREDIENTS", payload: data });
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  // 📌 Add an Ingredient
  const addIngredient = async (name) => {
    try {
      const res = await fetch(`${API_URL}/ingredients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      dispatch({ type: "ADD_INGREDIENT", payload: data });
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  // 📌 Fetch User Inventory
  const fetchInventory = async () => {
    try {
      const res = await fetch(`${API_URL}/user/inventory`, {
        headers: { Authorization: `${getToken()}` },
      });
      const data = await res.json();
      dispatch({ type: "SET_INVENTORY", payload: data.ingredients });
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // 📌 Add Item to Inventory
  const addInventoryItem = async (ingredientId, quantity) => {
    try {
      const res = await fetch(`${API_URL}/user/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
        body: JSON.stringify({ ingredients: [{ ingredientId, quantity }] }),
      });
      const data = await res.json();
      dispatch({ type: "ADD_INVENTORY_ITEM", payload: { ingredientId, quantity } });
    } catch (error) {
      console.error("Error adding inventory item:", error);
    }
  };

  // 📌 Delete Item from Inventory
  const deleteInventoryItem = async (ingredientId) => {
    try {
      const res = await fetch(`${API_URL}/user/inventory/${ingredientId}`, {
        method: "DELETE",
        headers: { Authorization: `${getToken()}` },
      });
      if (res.ok) {
        dispatch({ type: "DELETE_INVENTORY_ITEM", payload: ingredientId });
      }
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  // 📌 Fetch All Recipes
  const fetchRecipes = async () => {
    try {
      const res = await fetch(`${API_URL}/recipes`, {
        headers: { Authorization: `${getToken()}` },
      });
      const data = await res.json();
      dispatch({ type: "SET_RECIPES", payload: data });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // 📌 Fetch Recipes Based on Inventory
  const fetchRecipesByInventory = async () => {
    try {
      const res = await fetch(`${API_URL}/user/recipes`, {
        headers: { Authorization: `${getToken()}` },
      });
      const data = await res.json();
      dispatch({ type: "SET_RECIPES", payload: data.recipes });
    } catch (error) {
      console.log("Error fetching recipes:", error);
    }
  };

  // 📌 Add a Recipe
  const addRecipe = async (name, description, ingredients) => {
    try {
      const res = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
        body: JSON.stringify({ name, description, ingredients }),
      });
      const data = await res.json();
      dispatch({ type: "ADD_RECIPE", payload: data.recipe });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  // 📌 Fetch a Single Recipe by ID
const selectRecipe = async (recipeId) => {
    try {
        const res = await fetch(`${API_URL}/recipes/select/${recipeId}`, {
            method:"POST",
            headers: { 'Authorization': `${getToken()}` }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch recipe");
        }

        const data = await res.json();
        return data; // Returning the fetched recipe for further use
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return null;
    }
};


  return (
    <PantryContext.Provider
      value={{
        ingredients: state.ingredients,
        inventory: state.inventory,
        recipes: state.recipes,
        fetchIngredients,
        addIngredient,
        fetchInventory,
        addInventoryItem,
        deleteInventoryItem,
        fetchRecipes,
        addRecipe,
        selectRecipe,
        fetchRecipesByInventory,
      }}
    >
      {children}
    </PantryContext.Provider>
  );
};
