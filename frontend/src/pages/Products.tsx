import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";
import ProductFilters from "../components/ProductFilters";

type Product = {
  id: number;
  title: string;
  category_name: string;
  price: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    fetchProducts(filters)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [filters]);

  return (
    <div className="flex gap-6">
      <ProductFilters onChange={updateFilter} />

      <div className="grid grid-cols-3 gap-4">
        {products.map(p => (
          <Link to={`/products/${p.id}`} key={p.id} className="border p-4">
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.category_name}</p>
            <p>${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
