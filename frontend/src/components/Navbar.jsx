import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, LogOut, LayoutDashboard, History, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <BrainCircuit size={24} />
        <span>QuizPlatform</span>
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/history">
              <History size={18} /> History
            </Link>
            {user.role === "admin" && (
              <Link to="/admin">
                <ShieldCheck size={18} /> Admin
              </Link>
            )}
            <span className="navbar-user">Hi, {user.name}</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
