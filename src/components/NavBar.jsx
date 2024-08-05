import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { DarkMode } from "../contexts/DarkMode";

export const NavBar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const isActiveLink = (path) =>
    location.pathname === path ? "is-active" : "";

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <button
            className="navbar-burger"
            aria-label="menu"
            aria-expanded={isActive}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
          <Link to="/" className="logo">
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <Link className={`navbar-item ${isActiveLink("/")}`} to="/">
              Home
            </Link>
            <Link
              className={`navbar-item ${isActiveLink("/about")}`}
              to="/about"
            >
              About
            </Link>
            <Link
              className={`navbar-item ${isActiveLink("/contact")}`}
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className={`navbar-item ${isActiveLink("/articles")}`}
              to="/articles"
            >
              Articles
            </Link>
            {auth.isAuthenticated && (
              <>
                <Link
                  className={`navbar-item ${isActiveLink(
                    "/article/new-article"
                  )}`}
                  to="/article/new-article"
                >
                  New Article
                </Link>
                <Link
                  className={`navbar-item ${isActiveLink("/users/profiles")}`}
                  to="/users/profiles"
                >
                  Profile
                </Link>
                <Link
                  className={`navbar-item ${isActiveLink(
                    "/users/profiles/profile_data"
                  )}`}
                  to="/users/profiles/profile_data"
                >
                  Profile Detail
                </Link>
              </>
            )}
            <div className="navbar-end">
              <div className="navbar-item">
                {auth.isAuthenticated ? (
                  <>
                    <div className="navbar-item">Hello, {auth.username}!</div>
                    <button className="button-prueba" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    className={`navbar-item ${isActiveLink(
                      "/users/profiles/login"
                    )}`}
                    to="/users/profiles/login"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="container mr-6">
                <DarkMode />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
