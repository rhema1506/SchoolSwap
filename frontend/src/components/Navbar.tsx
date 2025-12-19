import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import NotificationBell from "./NotificationBell";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4
                    bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center space-x-4">
        <Link to="/"><strong>SchoolSwap</strong></Link>
        <Link to="/products">Products</Link>
        <Link to="/add">Add Product</Link>
        <Link to="/test">Test</Link>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationBell />
        <ThemeToggle />
        {user ? (
          <>
            <span>{user.username}</span>
            <button
              className="px-2 py-1 border rounded"
              onClick={() => { logout(); nav("/"); }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
