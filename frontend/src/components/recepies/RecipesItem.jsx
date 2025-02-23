import { useEffect } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is imported

const RecipeCard = ({ recipeData, onSelect }) => {
  console.log(recipeData);
  useEffect(() => {
    document.querySelectorAll('[data-bs-toggle="offcanvas"]').forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let offcanvasId = event.target.getAttribute("data-bs-target");
        let offcanvas = new bootstrap.Offcanvas(document.querySelector(offcanvasId));
        offcanvas.show();
      });
    });
  }, []);

  // if (!recipeData || !recipeData.id) {
  //   return <p>Error: Recipe data is missing or invalid</p>;
  // }
  const getShortDescription = (description) => {
    const words = description.split(" ");
    return words.length > 50 ? words.slice(0, 50).join(" ") + "..." : description;
  };

  return (
    <>
      {/* Recipe Card */}
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{recipeData.name}</h5>
          <p className="card-text">
            {getShortDescription(recipeData.description)}{" "}
            <div
              className="text-primary"
              style={{ cursor: "pointer" }}
              data-bs-toggle="offcanvas"
              data-bs-target={`#recipeOffcanvas-${recipeData.id || "defaultId"}`}
            >
              See More
            </div>
          </p>


        </div>
      </div>

      {/* Full-Screen Popup (Offcanvas) */}
      <div
        className="offcanvas offcanvas-start"
        id={`recipeOffcanvas-${recipeData.id || "defaultId"}`}
        tabIndex="-1"
        aria-labelledby={`recipeOffcanvasLabel-${recipeData.id || "defaultId"}`}
        data-bs-backdrop="false" // Disables the backdrop
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id={`recipeOffcanvasLabel-${recipeData.id || "defaultId"}`}>
            {recipeData.name}
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <p>{recipeData.description}</p>
          <ul>
            {recipeData.ingredients.map((item) => {
              if (item.ingredientId) {

                return <li key={item._id}>{item.ingredientId.name}
                <div>
                  <ul>
                    <li>Quantity: {item.quantity}</li>
                  </ul>
                </div>
                </li>;
              }
            })}
          </ul>
          <button className="btn btn-primary" onClick={onSelect}>Select Recipe</button>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
