import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <header className="navbar">
      <div className="container" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div>
          <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>{t("welcome")}</Link>
        </div>
        <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
          <button className="btn" onClick={toggleLang} style={{background:"#fff", color:"#0b5ed7"}}>{i18n.language === "en" ? "Русский" : "English"}</button>
          <Link to="/" style={{color: "white", textDecoration: "none"}}>{t("products")}</Link>
          {user ? (
            <>
              <Link to="/add" style={{color: "white", textDecoration: "none"}}>{t("add_product")}</Link>
              <button className="btn" onClick={() => { logout(); navigate("/"); }} style={{background:"transparent", color:"white"}}>{t("logout")}</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{color: "white", textDecoration: "none"}}>{t("login")}</Link>
              <Link to="/register" style={{color: "white", textDecoration: "none"}}>{t("register")}</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
