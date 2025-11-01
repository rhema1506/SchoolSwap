import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate("/");
    else alert("Login failed");
  };

  return (
    <div className="container">
      <form onSubmit={submit} style={{ maxWidth: 420, margin: "20px auto", background: "#fff", padding: 20, borderRadius: 8 }}>
        <h2>Login</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={{ width: "100%", padding:8, marginBottom:12 }} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", padding:8, marginBottom:12 }} />
        <button className="btn" type="submit" style={{ background:"#0b5ed7", color:"white" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
