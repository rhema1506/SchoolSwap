import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("products/")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">
          No products found.
        </p>
      )}
    </div>
  );
}

export default ProductList;
