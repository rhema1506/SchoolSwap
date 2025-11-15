import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { PRODUCTS } from "../api/endpoints";
import type { Product } from "../types/product";
import { useTranslation } from "react-i18next";

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");

  const fetchProducts = async (params: Record<string, string> = {}) => {
    setLoading(true);
    try {
      const res = await API.get(PRODUCTS, { params });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const applyFilters = () => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (condition) params.condition = condition;
    if (city) params.city = city;
    fetchProducts(params);
  };

  return (
    <div className="container py-6">
      <div className="mb-4 bg-white p-4 rounded flex flex-wrap gap-3 items-center">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("search")} className="border p-2 rounded w-60" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          <option value="">All categories</option>
          <option value="books">Books</option>
          <option value="stationery">Stationery</option>
          <option value="uniforms">Uniforms</option>
          <option value="gadgets">Gadgets</option>
          <option value="other">Other</option>
        </select>
        <select value={condition} onChange={(e) => setCondition(e.target.value)} className="border p-2 rounded">
          <option value="">All conditions</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder={t("city")} className="border p-2 rounded w-40" />
        <button onClick={applyFilters} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded">{t("filter")}</button>
      </div>

      {loading ? <Loader /> : (
        products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : <div className="text-gray-500">{t("no_products")}</div>
      )}
    </div>
  );
};

export default Products;
