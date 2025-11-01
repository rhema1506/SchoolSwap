import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-500 mb-2">Condition: {product.condition}</p>
      <p className="text-gray-500 mb-2">Category: {product.category}</p>
      <p className="text-gray-500 mb-2">City: {product.city}</p>
    </div>
  );
}

export default ProductDetail;
