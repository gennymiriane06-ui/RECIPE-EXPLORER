# Saffron & Sage – Recipe Explorer

A warm, editorial-style recipe browsing app built with React and TheMealDB API. Browse trending recipes, filter by category, search dynamically, and save your favorites — all with smooth animations.

## Features

- Recipe Grid

- Search

- Category Filter

- Animated Navigation

- Recipe Detail View

- Favorites System

- Dark Mode Toggle

- Pagination

- Loading & Error States

- Responsive Design

## How to Run

npm install

npm run dev

## Build for Production

npm run build
npm run preview

## Project Structure

src/
  components/
    RecipeCard.jsx
    SearchBar.jsx
    Loader.jsx
  pages/
    Home.jsx
    RecipeDetail.jsx
    Favorites.jsx
  services/
    api.js 
  hooks/
    useFavorites.js
    useDebounce.js    
  App.jsx              
  main.jsx             
  index.css

## API

Uses [TheMealDB](https://www.themealdb.com/api.php) (free, no key required):# RECIPE-EXPLORER
