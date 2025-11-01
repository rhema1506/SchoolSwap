import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerUser(form.username, form.email, form.password);
    if (success) navigate("/");
    else alert("Registration failed");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border rounded-md p-2 w-full mb-4"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border rounded-md p-2 w-full mb-4"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border rounded-md p-2 w-full mb-4"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700">
          Register
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
