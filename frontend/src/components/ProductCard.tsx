import React from "react";
import { Link } from "react-router-dom";

type Props = {
  product: any;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="card">
      {product.image && <img src={product.image} alt={product.title} />}
      <h3 style={{ margin: "8px 0 6px", fontSize: 16 }}>{product.title}</h3>
      <div style={{ color: "#6b7280", fontSize: 13 }}>{product.category?.toUpperCase()}</div>
      <div style={{ marginTop: "6px", fontSize: 13 }}>{product.city}</div>
    </Link>
  );
};

export default ProductCard;

