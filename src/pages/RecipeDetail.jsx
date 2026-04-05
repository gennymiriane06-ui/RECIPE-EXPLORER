import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { fetchById } from "../services/api";

function RecipeDetail({ recipe: base, onBack, isFavorite, onToggleFavorite }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchById(base.idMeal)
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load recipe details.");
        setLoading(false);
      });
  }, [base.idMeal]);

  function getIngredients(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name && name.trim()) {
        list.push({ name: name.trim(), measure: (measure || "").trim() });
      }
    }
    return list;
  }

  function getSteps(text) {
    if (!text) return [];
    return text
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 8);
  }

  function toggleIngredient(i) {
    setCheckedIngredients((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  function toggleStep(i) {
    setCheckedSteps((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="mb-4">{error}</p>
        <button onClick={onBack} className="text-orange-500 underline text-sm">Go back</button>
      </div>
    );
  }

  if (!recipe) return null;

  const ingredients = getIngredients(recipe);
  const steps = getSteps(recipe.strInstructions);
  const fav = isFavorite(recipe.idMeal);

  return (
    <div className="w-full min-h-screen bg-gray-50">

      <div className="relative w-full">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ← Back
        </button>

        <button
          onClick={() => onToggleFavorite(recipe)}
          className={`absolute top-4 right-4 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            fav
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <svg viewBox="0 0 24 24" fill={fav ? "white" : "none"} stroke={fav ? "white" : "currentColor"} strokeWidth="2" className="w-4 h-4">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {fav ? "Saved" : "Save"}
        </button>

        <div className="absolute bottom-4 left-4 flex gap-2">
          {recipe.strCategory && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              {recipe.strArea}
            </span>
          )}
        </div>
      </div>

      <div className="w-full px-8 py-8">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">{recipe.strMeal}</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="md:col-span-1">
            <h2 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {ingredients.map((item, i) => (
                <li
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className={`flex items-center gap-3 text-sm cursor-pointer select-none transition-opacity ${
                    checkedIngredients[i] ? "opacity-40 line-through" : ""
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs ${
                    checkedIngredients[i]
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-300"
                  }`}>
                    {checkedIngredients[i] && "✓"}
                  </span>
                  <span className="text-gray-700">{item.name}</span>
                  {item.measure && (
                    <span className="ml-auto text-gray-400 text-xs">{item.measure}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              Instructions
            </h2>
            <ol className="space-y-3">
              {steps.map((step, i) => (
                <li
                  key={i}
                  onClick={() => toggleStep(i)}
                  className={`flex gap-3 cursor-pointer select-none bg-white border border-gray-100 rounded-lg p-4 transition-opacity ${
                    checkedSteps[i] ? "opacity-40" : ""
                  }`}
                >
                  <span className={`text-xs font-bold mt-0.5 w-6 h-6 rounded flex-shrink-0 flex items-center justify-center ${
                    checkedSteps[i]
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.strYoutube && (
          <div className="mt-8 bg-orange-50 border border-orange-100 rounded-xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Ready to cook?</p>
              <p className="text-xs text-gray-500 mt-0.5">Watch the full video tutorial on YouTube.</p>
            </div>
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors whitespace-nowrap"
            >
              Watch video →
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

export default RecipeDetail;