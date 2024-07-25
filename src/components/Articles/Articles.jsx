import React, { useState, useEffect, useContext } from "react";
import { fetchArticles } from "../../hooks/ConnApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Asegúrate de que la ruta sea correcta

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext); // Obtiene el estado de autenticación

  useEffect(() => {
    async function getArticles() {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        if (error.message === "Error al obtener los artículos") {
          navigate("/login");
        } else {
          setError(error.message);
        }
      }
    }
    getArticles();
  }, [navigate]);

  const handleDelete = async (articleId) => {
    // Lógica para eliminar el artículo
    console.log("Delete article with id:", articleId);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
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
                {article.image && (
                  <figure className="image">
                    <img
                      src={article.image}
                      alt={article.caption || "Placeholder image"}
                      style={{
                        objectFit: "cover",
                        width: "300px",
                        height: "300px",
                      }}
                    />
                  </figure>
                )}
              </div>
              <div className="content">
                {article.abstract && (
                  <p>
                    <strong>Abstract:</strong> {article.abstract}
                  </p>
                )}
                <p>{article.content}</p>
                <br />
              </div>
            </div>
            <div className="card-footer">
              <p className="card-footer-item">Author: {article.author}</p>
              <p className="card-footer-item">
                Views: {article.view_count || 0}
              </p>
              <time className="card-footer-item" dateTime={article.created_at}>
                {new Date(article.created_at).toLocaleString()}
              </time>
              <time className="card-footer-item" dateTime={article.updated_at}>
                {new Date(article.updated_at).toLocaleString()}
              </time>
            </div>
            <footer className="card-footer">
              <p className="card-footer-item">
                Categories:{" "}
                {article.categories ? article.categories.join(", ") : "N/A"}
              </p>
              <p className="card-footer-item">
                Tags: {article.tags ? article.tags.join(", ") : "N/A"}
              </p>
              <p className="card-footer-item">
                Reactions:{" "}
                {article.reactions ? article.reactions.join(", ") : "N/A"}
              </p>
              <a
                href="#"
                className="card-footer-item"
                onClick={() => navigate(`/article/${article.id}`)}
              >
                View +
              </a>

              {auth.isAuthenticated && (
                <>
                  <a
                    href="#"
                    className="card-footer-item"
                    onClick={() => navigate(`/article/edit/${article.id}`)}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="card-footer-item"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </a>
                </>
              )}
            </footer>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
