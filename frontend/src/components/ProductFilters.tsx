import { useEffect, useState } from "react";
import { fetchCategories } from "../api/products";

interface Category {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  onChange: (field: string, value: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then(res => setCategories(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Search..."
        onChange={e => onChange("q", e.target.value)}
        className="border p-2 w-full rounded"
        aria-label="Search products"
      />

      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load categories</p>
      ) : (
        <select
          onChange={e => onChange("category", e.target.value)}
          className="border p-2 w-full rounded"
          aria-label="Filter by category"
          defaultValue=""
        >
          <option value="">All categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      )}

      <select
        onChange={e => onChange("sort", e.target.value)}
        className="border p-2 w-full rounded"
        aria-label="Sort products"
        defaultValue=""
      >
        <option value="">Newest</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
      </select>
    </div>
  );
};

export default ProductFilters;
