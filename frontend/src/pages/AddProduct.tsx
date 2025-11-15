import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosClient";
import { PRODUCTS } from "../api/endpoints";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "books",
    condition: "new",
    city: ""
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("condition", form.condition);
      fd.append("city", form.city);
      if (image) fd.append("image", image);
      await API.post(PRODUCTS, fd, { headers: { "Content-Type": "multipart/form-data" }});
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    } finally { setLoading(false); }
  };

  return (
    <div className="container py-8">
      <form onSubmit={submit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <input className="w-full border p-2 rounded" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} placeholder="Title" required />
        <textarea className="w-full border p-2 rounded" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} placeholder="Description" />
        <div className="flex gap-2">
          <select className="border p-2 rounded" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})}>
            <option value="books">Books</option>
            <option value="stationery">Stationery</option>
            <option value="uniforms">Uniforms</option>
            <option value="gadgets">Gadgets</option>
            <option value="other">Other</option>
          </select>
          <select className="border p-2 rounded" value={form.condition} onChange={(e)=>setForm({...form, condition:e.target.value})}>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          <input className="border p-2 rounded flex-1" value={form.city} onChange={(e)=>setForm({...form, city:e.target.value})} placeholder="City" />
        </div>
        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files?.[0] ?? null)} />
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Uploading..." : "Add Product"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
