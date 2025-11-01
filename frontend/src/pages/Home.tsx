import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    API.get("products/").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{t("welcome")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
