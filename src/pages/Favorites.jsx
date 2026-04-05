import React from "react";
import RecipeCard from "../components/RecipeCard";

function Favorites({ favorites, onSelect, isFavorite, onToggleFavorite }) {
  return (
    <div className="w-full min-h-screen bg-gray-50 px-8 py-8">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
        <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full">
          {favorites.length} saved
        </span>
      </div>

      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="text-5xl mb-4">🍽️</span>
          <p className="text-gray-500 text-sm">No favorites yet.</p>
          <p className="text-gray-400 text-xs mt-1">Tap the heart on any recipe to save it here.</p>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onClick={onSelect}
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Favorites;