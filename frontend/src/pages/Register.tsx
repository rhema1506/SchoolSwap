import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register(username, email, password);
    if (ok) navigate("/products");
    else alert("Registration failed");
  };

  return (
    <div className="container py-8">
      <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Register</h2>
        <input className="w-full border p-2 rounded" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="w-full border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full border p-2 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Create account</button>
      </form>
    </div>
  );
};

export default Register;
