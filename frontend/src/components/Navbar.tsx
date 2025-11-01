import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-200 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">School Swap</Link>
      <div className="flex gap-4 items-center">
        <LanguageSwitcher />
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
