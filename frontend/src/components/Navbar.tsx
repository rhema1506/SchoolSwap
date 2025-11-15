import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold">{t("welcome")}</Link>
          <Link to="/products" className="hover:underline">{t("products")}</Link>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user ? (
            <>
              <Link to="/add" className="px-3 py-1 bg-white text-blue-600 rounded">{t("add_product")}</Link>
              <button className="px-3 py-1 rounded hover:bg-white/10" onClick={() => { logout(); navigate("/"); }}>{t("logout")}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded hover:bg-white/10">{t("login")}</Link>
              <Link to="/register" className="px-3 py-1 rounded hover:bg-white/10">{t("register")}</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
