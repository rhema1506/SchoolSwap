import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("books");
  const [condition, setCondition] = useState("used");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;
    const arr = Array.from(selected);
    setFiles(arr);
    setPreviews(arr.map(f => URL.createObjectURL(f)));
  };

  useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p));
    };
  }, [previews]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("products/", {
        title,
        description: desc,
        category,
        condition,
      });

      const product = res.data;

      if (files.length > 0) {
        const form = new FormData();
        form.append("product", String(product.id));
        files.forEach(f => form.append("images", f));
        await api.post("products/upload/", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate(`/products/${product.id}`);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to create product");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 700 }}>
      <h3>Add Product</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <div>
        <label>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="books">Books</option>
          <option value="stationery">Stationery</option>
          <option value="uniforms">Uniforms</option>
          <option value="gadgets">Gadgets</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Condition</label>
        <select value={condition} onChange={e => setCondition(e.target.value)}>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>

      <div>
        <label>Images (multiple)</label>
        <input type="file" multiple accept="image/*" onChange={handleFiles} />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {previews.map((p, i) => (
            <img
              key={i}
              src={p}
              alt="preview"
              style={{ width: 120, height: 80, objectFit: "cover" }}
            />
          ))}
        </div>
      </div>

      <button type="submit">Create Product</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
