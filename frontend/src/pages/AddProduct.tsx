import React, { useState } from "react";
import api from "../api/axios";

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "books",
    condition: "new",
    city: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    try {
      await api.post("products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" className="border w-full p-2 rounded-md"
          onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="border w-full p-2 rounded-md"
          onChange={handleChange}></textarea>
        <select name="category" className="border w-full p-2 rounded-md" onChange={handleChange}>
          <option value="books">Books</option>
          <option value="stationery">Stationery</option>
          <option value="uniforms">Uniforms</option>
          <option value="gadgets">Gadgets</option>
          <option value="other">Other</option>
        </select>
        <select name="condition" className="border w-full p-2 rounded-md" onChange={handleChange}>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <input name="city" placeholder="City" className="border w-full p-2 rounded-md"
          onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
