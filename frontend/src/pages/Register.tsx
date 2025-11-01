import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register(form.username, form.email, form.password);
    if (ok) navigate("/");
    else alert("Registration failed");
  };

  return (
    <div className="container">
      <form onSubmit={submit} style={{ maxWidth: 420, margin: "20px auto", background: "#fff", padding: 20, borderRadius: 8 }}>
        <h2>Register</h2>
        <input name="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} placeholder="Username" style={{ width: "100%", padding:8, marginBottom:12 }} />
        <input name="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="Email" style={{ width: "100%", padding:8, marginBottom:12 }} />
        <input name="password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="Password" style={{ width: "100%", padding:8, marginBottom:12 }} />
        <button className="btn" type="submit" style={{ background:"#0b5ed7", color:"white" }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
