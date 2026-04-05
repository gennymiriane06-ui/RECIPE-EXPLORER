import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { useDebounce } from "../hooks/useDebounce";
import { fetchCategories, fetchByCategory, searchByName, fetchTrending } from "../services/api";

const PAGE_SIZE = 12;

function Home({ onSelect, isFavorite, onToggleFavorite }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    setPage(1);

    async function load() {
      try {
        let data;
        if (debouncedQuery.trim()) {
          data = await searchByName(debouncedQuery.trim());
        } else if (activeCategory === "All") {
          data = await fetchTrending();
        } else {
          data = await fetchByCategory(activeCategory);
        }
        setRecipes(data);
      } catch {
        setError("Failed to load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [debouncedQuery, activeCategory]);

  function handleCategory(cat) {
    setActiveCategory(cat);
    setQuery("");
  }

  const shown = recipes.slice(0, page * PAGE_SIZE);
  const hasMore = shown.length < recipes.length;

  return (
    <div className="w-full min-h-screen bg-gray-50">

      <div className="w-full bg-white px-8 py-12 border-b border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          What are we <span className="text-orange-500 italic">crafting</span> today?
        </h1>
        <p className="text-gray-500 text-sm mb-6">Browse thousands of recipes from around the world</p>
        <div className="flex gap-3 items-center">
          <SearchBar value={query} onChange={setQuery} />
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
            Explore
          </button>
        </div>
      </div>

      <div className="w-full bg-white border-b border-gray-100 px-8 py-3 flex gap-2 overflow-x-auto">
        <button
          onClick={() => handleCategory("All")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === "All"
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            onClick={() => handleCategory(cat.strCategory)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.strCategory
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>

      <div className="w-full px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {debouncedQuery
            ? `Results for "${debouncedQuery}"`
            : activeCategory === "All"
            ? "Trending Recipes"
            : activeCategory}
        </h2>
        <p className="text-sm text-gray-400 mb-2">
          {debouncedQuery
            ? ""
            : activeCategory === "All"
            ? "Discover the most popular recipes loved by our community."
            : `Browse all ${activeCategory} recipes.`}
        </p>
        {!loading && (
          <p className="text-sm font-medium text-gray-700 mb-5">Found {recipes.length} recipes</p>
        )}

        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {loading && <Loader />}
        {!loading && !error && recipes.length === 0 && (
          <p className="text-center text-gray-400 py-20 text-sm">No recipes found. Try a different search.</p>
        )}

        {!loading && recipes.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {shown.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onClick={onSelect}
                  isFavorite={isFavorite(recipe.idMeal)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="border border-gray-300 text-gray-600 px-8 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full flex justify-center px-8 pb-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-3xl overflow-hidden flex flex-col sm:flex-row items-center">
          <div className="flex-1 px-10 py-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
              Join our culinary inner circle.
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Get exclusive recipes, seasonal guides, and chef interviews delivered weekly.
            </p>
            <div className="flex gap-3 items-center flex-wrap">
              <input
                type="email"
                placeholder="email@address.com"
                className="border border-gray-300 rounded-full px-5 py-2.5 text-sm outline-none focus:border-gray-500 w-56"
              />
              <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors whitespace-nowrap">
                Sign Me Up
              </button>
            </div>
          </div>

          <div className="hidden sm:block flex-shrink-0 self-stretch">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=240&h=300&fit=crop&crop=top"
              alt="Chef"
              className="h-full w-48 object-cover"
            />
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-gray-200 py-4 text-center text-sm text-gray-400">
        © 2026 Recipe Explorer
      </footer>

    </div>
  );
}

export default Home;