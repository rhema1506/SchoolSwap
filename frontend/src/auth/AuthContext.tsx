import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User { id: number; username: string; email: string; }
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }
    api.get("auth/me/")
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem("accessToken"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    const res = await api.post("auth/login/", { username: usernameOrEmail, password });
    // SimpleJWT returns access and refresh
    const { access, refresh } = res.data;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    // fetch user
    const me = await api.get("auth/me/");
    setUser(me.data);
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await api.post("auth/register/", { username, email, password });
    const { access, refresh } = res.data;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    const me = await api.get("auth/me/");
    setUser(me.data);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
