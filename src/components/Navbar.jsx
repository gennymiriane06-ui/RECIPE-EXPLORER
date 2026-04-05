import React from "react";

function Navbar({ page, onNavigate, favCount }) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      <button
        onClick={() => onNavigate("home")}
        className="text-lg font-bold text-gray-900 hover:text-orange-500 transition-colors"
      >
        🍴Saffron & Sage
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => onNavigate("home")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            page === "home"
              ? "bg-orange-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate("favorites")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
            page === "favorites"
              ? "bg-orange-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Favorites
          {favCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {favCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;