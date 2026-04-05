import React from "react";

function RecipeCard({ recipe, onClick, isFavorite, onToggleFavorite }) {
  const { strMeal, strMealThumb, strCategory, strArea } = recipe;

  function handleFav(e) {
    e.stopPropagation();
    onToggleFavorite(recipe);
  }

  return (
    <div
      onClick={() => onClick(recipe)}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-52 object-cover"
          loading="lazy"
        />
        <button
          onClick={handleFav}
          className="absolute top-3 right-3 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? "#ef4444" : "none"}
            stroke={isFavorite ? "#ef4444" : "#9ca3af"}
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="px-4 pt-3 pb-4">
        {strCategory && (
          <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
            {strCategory}
          </span>
        )}

        <p className="text-sm font-bold text-gray-900 leading-snug mb-3">{strMeal}</p>

        {strArea && (
          <p className="text-xs text-gray-400 italic text-right">{strArea}</p>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;