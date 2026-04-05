const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories.php`);
  const data = await res.json();
  return data.categories;
}

export async function fetchByCategory(category) {
  const res = await fetch(`${BASE}/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals || [];
}

export async function searchByName(name) {
  const res = await fetch(`${BASE}/search.php?s=${name}`);
  const data = await res.json();
  return data.meals || [];
}

export async function fetchById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function fetchTrending() {
  const cats = ["Chicken", "Seafood", "Dessert", "Beef"];
  const results = await Promise.all(cats.map((c) => fetchByCategory(c)));
  return results.flat().slice(0, 12);
}