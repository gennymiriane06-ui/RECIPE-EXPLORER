import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md">
      <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search recipes..."
        className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
      />
      {value && (
        <button onClick={() => onChange("")} className="text-gray-400 hover:text-gray-600 ml-2 text-xs">
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;