import  { createContext, useReducer } from 'react';
import pantryReducer from './pantryReducer';

// Initial State
const initialState = {
    ingredients: [],
    inventory: [],
    recipes: []
};

// Create Context
export const PantryContext = createContext(initialState);

// Provider Component
export const PantryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pantryReducer, initialState);

    // API Base URL
    const API_URL = 'http://localhost:5000/api';

    //  Fetch All Ingredients
    const fetchIngredients = async () => {
        try {
            const res = await fetch(`${API_URL}/ingredients`);
            const data = await res.json();
            dispatch({ type: 'SET_INGREDIENTS', payload: data });
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    // 📌 Add an Ingredient
    const addIngredient = async (name) => {
        try {
            const res = await fetch(`${API_URL}/ingredients`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            const data = await res.json();
            dispatch({ type: 'ADD_INGREDIENT', payload: data });
        } catch (error) {
            console.error('Error adding ingredient:', error);
        }
    };

    // 📌 Fetch User Inventory
    const fetchInventory = async (token) => {
        try {
            const res = await fetch(`${API_URL}/user/inventory`, {
                headers: { 'Authorization': `${token}` }
            });
            const data = await res.json();
            dispatch({ type: 'SET_INVENTORY', payload: data.ingredients });
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    // 📌 Add Item to Inventory
    const addInventoryItem = async (token, ingredientId, quantity) => {
        try {
            const res = await fetch(`${API_URL}/user/inventory`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ingredients: [{ ingredientId, quantity }] })
            });
            const data = await res.json();
            dispatch({ type: 'ADD_INVENTORY_ITEM', payload: { ingredientId, quantity } });
        } catch (error) {
            console.error('Error adding inventory item:', error);
        }
    };

    // 📌 Delete Item from Inventory
    const deleteInventoryItem = async (token, ingredientId) => {
        try {
            const res = await fetch(`${API_URL}/user/inventory/${ingredientId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                dispatch({ type: 'DELETE_INVENTORY_ITEM', payload: ingredientId });
            }
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    // 📌 Fetch All Recipes
    const fetchRecipes = async (token) => {
        try {
            const res = await fetch(`${API_URL}/recipes`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            dispatch({ type: 'SET_RECIPES', payload: data });
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    // 📌 Add a Recipe
    const addRecipe = async (token, name, description, ingredients) => {
        try {
            const res = await fetch(`${API_URL}/recipes`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, description, ingredients })
            });
            const data = await res.json();
            dispatch({ type: 'ADD_RECIPE', payload: data.recipe });
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <PantryContext.Provider value={{
            ingredients: state.ingredients,
            inventory: state.inventory,
            recipes: state.recipes,
            fetchIngredients,
            addIngredient,
            fetchInventory,
            addInventoryItem,
            deleteInventoryItem,
            fetchRecipes,
            addRecipe
        }}>
            {children}
        </PantryContext.Provider>
    );
};
