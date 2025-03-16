import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import "../../App.css";  // Import CSS

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
    };

    window.addEventListener("storage", checkAuthStatus); // Detects login/logout changes

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {isAuthenticated && <Link to="/dashboard">Research Dashboard</Link>}
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
