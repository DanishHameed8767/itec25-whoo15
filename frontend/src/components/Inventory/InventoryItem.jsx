const InventoryItem = ({ ingredient, onRemove }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-CA", { year: "2-digit", month: "2-digit", day: "2-digit" });
};


    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          {/* Ingredient Title */}
          <h5 className="card-title">{ingredient.name}</h5>
          <p className="card-text">Quantity: {ingredient.quantity}</p>
          
          {/* Expiry Date */}
          <p className="card-text">Expiry Date: {formatDate(ingredient.expiryDate)}</p>
          
          {/* Remove Button */}
          <button className="btn btn-danger" onClick={() => onRemove(ingredient.id)}>
            Remove
          </button>
        </div>
      </div>
    );
  };
  
  export default InventoryItem;
  