import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const ok = await login(username, password);
    if (ok) navigate("/products");
    else setErr("Login failed");
  };

  return (
    <div className="container py-8">
      <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Login</h2>
        {err && <div className="text-red-600">{err}</div>}
        <input className="w-full border p-2 rounded" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username or email" />
        <input className="w-full border p-2 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
