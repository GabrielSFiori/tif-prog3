import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { DarkMode } from "../contexts/DarkMode";

export const NavBar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div>
        <nav
          className="navbar is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <figure>
            <Link to="/">
              <img className="logo" src={"/logo.png"} alt="logo" />
            </Link>
          </figure>
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
          </div>

          <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
            <div className="navbar-start">
              <Link className="navbar-item ml-3" to="/">
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
              </div>
              <DarkMode />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
