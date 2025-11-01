import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../utils/api";
import jwt_decode from "jwt-decode";

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      const decoded: any = jwt_decode(token);
      setUser(decoded);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { data } = await API.post("token/", { username, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    const decoded: any = jwt_decode(data.access);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)!;
