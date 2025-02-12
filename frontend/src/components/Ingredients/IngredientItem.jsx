const IngredientCard = ({ ingredient, onRemove }) => {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          {/* Ingredient Title */}
          <h5 className="card-title">{ingredient.title}</h5>
          
          {/* Expiry Date */}
          <p className="card-text">Expiry Date: {ingredient.expiryDate}</p>
          
          {/* Remove Button */}
          <button className="btn btn-danger" onClick={() => onRemove(ingredient.id)}>
            Remove
          </button>
        </div>
      </div>
    );
  };
  
  export default IngredientCard;
  