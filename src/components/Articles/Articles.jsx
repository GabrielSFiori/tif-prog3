import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../hooks/ConnApi";
import { NavLink, useNavigate } from "react-router-dom";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getArticles() {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        if (error.message === "Error al obtener los artículos") {
          // Si el error es de autenticación, redirige al usuario a la página de login
          navigate("/login");
        } else {
          setError(error.message);
        }
      }
    }
    getArticles();
  }, [navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container" style={{ marginTop: "3rem" }}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              className="card"
              key={index}
              style={{ marginBottom: "1rem", padding: "1rem" }}
            >
              <header className="card-header">
                <p
                  className="title is-3 is-centered"
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {article.title}
                </p>
                <button className="card-header-icon" aria-label="more options">
                  <span className="icon">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </header>
              <div className="card-content" style={{ display: "flex" }}>
                <div className="card-image" style={{ marginRight: "1rem" }}>
                  <figure className="image">
                    <img
                      src={article.image}
                      alt="Placeholder image"
                      style={{
                        objectFit: "cover",
                        width: "300px",
                        height: "300px",
                      }}
                    />
                  </figure>
                </div>
                <div className="content">
                  {article.content}
                  <br />
                </div>
              </div>
              <div className="card-footer">
                <p className="card-footer-item">Author: {article.author}</p>
                <time
                  className="card-footer-item"
                  dateTime={article.created_at}
                >
                  {new Date(article.created_at).toLocaleString()}
                </time>
              </div>
              <footer className="card-footer">
                <a href="" className="card-footer-item">
                  Save
                </a>
                <a href="#" className="card-footer-item">
                  Edit
                </a>
                <a href="#" className="card-footer-item">
                  Delete
                </a>
              </footer>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};
