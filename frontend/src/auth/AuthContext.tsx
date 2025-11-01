import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api";
import jwtDecode from "jwt-decode";

type AuthContextType = {
  user: any | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode<any>(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    // try backend login endpoints: prefer /auth/login/, fallback /token/
    try {
      let res;
      try {
        res = await API.post("auth/login/", { username, password });
      } catch {
        res = await API.post("token/", { username, password });
      }
      const data = res.data;
      localStorage.setItem("access", data.access);
      if (data.refresh) localStorage.setItem("refresh", data.refresh);
      const decoded = jwtDecode<any>(data.access);
      setUser(decoded);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await API.post("auth/register/", { username, email, password, password_confirm: password });
      // try login automatically
      return await login(username, password);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
