import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TestConnection from "./pages/TestConnection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import ChatRoom from "./pages/ChatRoom";
import Trades from "./pages/Trades";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";

import PrivateRoute from "./auth/PrivateRoute";

export default function App() {
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
        <Routes>
          <Route path="/" element={<h2>Welcome to SchoolSwap</h2>} />
          <Route path="/test" element={<TestConnection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />

          <Route
            path="/trades"
            element={
              <PrivateRoute>
                <Trades />
              </PrivateRoute>
            }
          />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
