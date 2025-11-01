import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { useTranslation } from "react-i18next";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, search, city]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("products/");
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterProducts = () => {
    let data = [...products];
    if (selectedCategory) data = data.filter(p => p.category === selectedCategory);
    if (search) data = data.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || (p.description || "").toLowerCase().includes(search.toLowerCase()));
    if (city) data = data.filter(p => (p.city || "").toLowerCase().includes(city.toLowerCase()));
    setFiltered(data);
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <input placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding:8, borderRadius:6, border:"1px solid #e5e7eb", width: "60%" }} />
        <input placeholder={t("city")} value={city} onChange={(e) => setCity(e.target.value)} style={{ padding:8, borderRadius:6, border:"1px solid #e5e7eb", width: "35%" }} />
      </div>

      <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />

      <div className="grid products-4" style={{ marginTop: 10 }}>
        {filtered.length > 0 ? filtered.map(p => <ProductCard key={p.id} product={p} />) : <div>No products found</div>}
      </div>
    </div>
  );
};

export default ProductList;
