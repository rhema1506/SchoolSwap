import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      nav("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: "20px auto" }}>
      <h3>Register</h3>
      <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <button type="submit">Register</button>
      <div style={{ color: "red" }}>{error}</div>
    </form>
  );
}
