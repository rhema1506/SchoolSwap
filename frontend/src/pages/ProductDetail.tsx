import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    if (id) load();
  }, [id]);

  const load = async () => {
    try {
      const res = await API.get(`products/${id}/`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          {product.image && <img src={product.image} alt={product.title} style={{ width: "100%", borderRadius: 8 }} />}
        </div>
        <div style={{ flex: 1 }}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Condition: {product.condition}</p>
          <p>City: {product.city}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
