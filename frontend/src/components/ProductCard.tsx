import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const img = product.image ? (product.image.startsWith("http") ? product.image : `http://127.0.0.1:8000${product.image}`) : undefined;
  return (
    <Link to={`/products/${product.id}`} className="block bg-white rounded-md shadow hover:shadow-md overflow-hidden">
      {img ? <img src={img} alt={product.title} className="w-full h-44 object-cover" /> : <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>}
      <div className="p-3">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category} • {product.condition}</p>
        <p className="mt-2 text-sm text-gray-600">{product.city}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
