import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import API from "../api/axiosClient";
import { AUTH_TOKEN, AUTH_REGISTER } from "../api/endpoints";
import type { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({ id: decoded.user_id ?? decoded.sub ?? decoded.id, username: decoded.username ?? decoded.user });
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    try {
      // backend may accept username or email; adjust payload if necessary
      const res = await API.post(AUTH_TOKEN, { username: usernameOrEmail, password });
      const data = res.data;
      localStorage.setItem("access", data.access);
      if (data.refresh) localStorage.setItem("refresh", data.refresh);
      const decoded: any = jwtDecode(data.access);
      setUser({ id: decoded.user_id ?? decoded.sub ?? decoded.id, username: decoded.username ?? usernameOrEmail });
      return true;
    } catch (err) {
      console.error("Login error", err);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await API.post(AUTH_REGISTER, { username, email, password });
      // auto-login
      return await login(username, password);
    } catch (err) {
      console.error("Register error", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
