import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import { useFavorites } from "./hooks/useFavorites";

function App() {
  const [page, setPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  function handleSelect(recipe) {
    setSelectedRecipe(recipe);
    setPage("detail");
    window.scrollTo(0, 0);
  }

  function handleBack() {
    setPage("home");
    setSelectedRecipe(null);
  }

  function handleNavigate(target) {
    setPage(target);
    setSelectedRecipe(null);
    window.scrollTo(0, 0);
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar
        page={page === "detail" ? "home" : page}
        onNavigate={handleNavigate}
        favCount={favorites.length}
      />

      {page === "home" && (
        <Home
          onSelect={handleSelect}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {page === "detail" && selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onBack={handleBack}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {page === "favorites" && (
        <Favorites
          favorites={favorites}
          onSelect={handleSelect}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;