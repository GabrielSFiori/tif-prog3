import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { DarkMode } from "../contexts/DarkMode";

export const NavBar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand ml-2">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
            <Link className="navbar-item" to="/articles">
              Articles
            </Link>
            {auth.isAuthenticated && (
              <Link className="navbar-item" to="/article/new-article">
                New Article
              </Link>
            )}
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {auth.isAuthenticated ? (
                <>
                  <div className="navbar-item">Hello, {auth.username}!</div>
                  <button className="button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link className="navbar-item" to="/login">
                  Login
                </Link>
              )}
              <DarkMode />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
