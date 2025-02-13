const pantryReducer = (state, action) => {
  switch (action.type) {
    case "SET_INGREDIENTS":
      return { ...state, ingredients: action.payload };
    case "SET_INVENTORY":
      return { ...state, inventory: action.payload };
    case "SET_RECIPES":
      return { ...state, recipes: action.payload };
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "ADD_INVENTORY_ITEM":
      return { ...state, inventory: [...state.inventory, action.payload] };
    case "ADD_RECIPE":
      return { ...state, recipes: [...state.recipes, action.payload] };
    case "DELETE_INVENTORY_ITEM":
      return {
        ...state,
        inventory: state.inventory.filter(
          (item) => item.ingredientId !== action.payload
        ),
      };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [...state.notifications, action.payload] };
    case "REMOVE_NOTIFICATION":
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    default:
      return state;
  }
};

export default pantryReducer;
