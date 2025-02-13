const IngredientCard = ({ ingredient, onAdd }) => {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body d-flex justify-content-between align-items-center">
          {/* Ingredient Title */}
          <h5 className="card-title">{ingredient.name}</h5>
          
          
          {/* Add Button */}
          <button className="btn btn-danger" onClick={() => onAdd(ingredient.id)}>
            Add
          </button>
        </div>
      </div>
    );
  };
  
  export default IngredientCard;
  