import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

type Product = {
  id: number;
  title: string;
  description: string;
  seller: number;
  category: string;
  condition: string;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [offeredProductId, setOfferedProductId] = useState<number | null>(null);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const nav = useNavigate();

  // Load product details
  useEffect(() => {
    if (!id) return;
    api.get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // Load user's own products
  useEffect(() => {
    if (!user) return;
    api.get("products/?owner=true")
      .then(res => setMyProducts(res.data.filter((p: Product) => p.seller === (user as any).id)))
      .catch(() => {
        // fallback: load all and filter
        api.get("products/")
          .then(res => setMyProducts(res.data.filter((p: Product) => p.seller === (user as any).id)));
      });
  }, [user]);

  const createTrade = async () => {
    if (!user) {
      nav("/login");
      return;
    }
    if (!product) return;

    try {
      const payload: any = {
        requested_product: product.id,
        message,
      };
      if (offeredProductId) payload.offered_product_id = offeredProductId;

      await api.post("trades/", payload);
      nav("/trades");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.detail || "Failed to create trade");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Not found</div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <div>Category: {product.category}</div>
      <div>Condition: {product.condition}</div>

      <hr />

      <h3>Request Trade or Claim</h3>
      <div>
        <label>
          Offer one of your products (optional)
          <select
            value={offeredProductId ?? ""}
            onChange={(e) =>
              setOfferedProductId(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">(No offer — request for free)</option>
            {myProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Message to owner:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </div>

      <button onClick={createTrade}>Send Trade Request</button>
    </div>
  );
}
