import React from "react";

const categories = [
  "All",
  "Books",
  "Stationery",
  "Uniforms",
  "Gadgets",
  "Other",
];

function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full border ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-blue-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
