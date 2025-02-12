import React, { createContext, useReducer, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const StoreContext = createContext();

const initialState = {
  recipes: [],
  users: [],
  ingredients: [],
};

export function storeReducer(state, action) {
  switch (action.type) {
    case "ADD_RECIPE":
      return { ...state, recipes: [...state.recipes, action.payload] };
    case "UPDATE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
      };
    case "DELETE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "UPDATE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.id === action.payload.id ? action.payload : ingredient
        ),
      };
    case "DELETE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

