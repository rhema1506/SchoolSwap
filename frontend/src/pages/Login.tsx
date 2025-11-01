import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">{t("login")}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white py-1">Login</button>
      </form>
    </div>
  );
};

export default Login;
