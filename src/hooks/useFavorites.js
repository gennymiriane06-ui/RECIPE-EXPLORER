import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id) {
    return favorites.some((r) => r.idMeal === id);
  }

  function toggleFavorite(recipe) {
    setFavorites((prev) =>
      isFavorite(recipe.idMeal)
        ? prev.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prev, recipe]
    );
  }

  return { favorites, isFavorite, toggleFavorite };
}