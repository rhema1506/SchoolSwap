import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosClient";
import { PRODUCTS } from "../api/endpoints";
import type { Product } from "../types/product";
import Loader from "../components/Loader";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await API.get(`${PRODUCTS}${id}/`);
        setProduct(res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="container py-6">Product not found</div>;

  const img = product.image ? (product.image.startsWith("http") ? product.image : `http://127.0.0.1:8000${product.image}`) : undefined;

  return (
    <div className="container py-6">
      <div className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>{img ? <img src={img} alt={product.title} className="w-full rounded" /> : <div className="w-full h-64 bg-gray-100 flex items-center justify-center">No image</div>}</div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-700 mb-3">{product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Condition:</strong> {product.condition}</p>
            <p><strong>City:</strong> {product.city}</p>
            <p className="mt-4"><strong>Ratings:</strong> {product.ratings?.length ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
