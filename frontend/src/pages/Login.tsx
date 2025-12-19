import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      nav("/");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: "20px auto" }}>
      <h3>Login</h3>
      <input placeholder="username or email" value={username} onChange={e => setUsername(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <button type="submit">Login</button>
      <div style={{ color: "red" }}>{error}</div>
    </form>
  );
}
