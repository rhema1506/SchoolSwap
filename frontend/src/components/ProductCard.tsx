import React from "react";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 hover:shadow-md transition">
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      )}
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-1">{product.category}</p>
      <p className="text-sm text-gray-500">{product.city}</p>
    </div>
  );
}

export default ProductCard;
