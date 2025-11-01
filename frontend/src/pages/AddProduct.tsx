import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "books",
    condition: "new",
    city: ""
  });
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("condition", form.condition);
      data.append("city", form.city);
      if (image) data.append("image", image);

      await API.post("products/", data, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Product added");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="container">
      <form onSubmit={submit} style={{ maxWidth: 700, margin: "20px auto", background:"#fff", padding:20, borderRadius:8 }}>
        <h2>Add Product</h2>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} style={{ width:"100%", padding:8, marginBottom:8 }} required/>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} style={{ width:"100%", padding:8, marginBottom:8 }} />
        <div style={{ display:"flex", gap:8, marginBottom:8 }}>
          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
            <option value="books">Books</option>
            <option value="stationery">Stationery</option>
            <option value="uniforms">Uniforms</option>
            <option value="gadgets">Gadgets</option>
            <option value="other">Other</option>
          </select>
          <select value={form.condition} onChange={(e) => setForm({...form, condition: e.target.value})}>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          <input placeholder="City" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} />
        </div>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
        <div style={{ marginTop: 12 }}>
          <button className="btn" type="submit" style={{ background:"#0b5ed7", color:"white" }}>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
