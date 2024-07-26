import React, { useState, useEffect } from "react";
import { fetchArticles, fetchCategories } from "../../hooks/ConnApi"; // Asegúrate de que fetchCategories esté disponible
import { useNavigate } from "react-router-dom";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getArticlesAndCategories() {
      try {
        const [articlesData, categoriesData] = await Promise.all([
          fetchArticles(),
          fetchCategories(), // Recupera las categorías
        ]);
        setArticles(articlesData);
        setCategories(categoriesData);
      } catch (error) {
        if (error.message === "Error al obtener los artículos") {
          navigate("/login");
        } else {
          setError(error.message);
        }
      }
    }
    getArticlesAndCategories();
  }, [navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Crea un mapa de categorías
  const categoriesMap = categories.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {});

  const getCategoryNames = (categories) => {
    return categories.map((id) => categoriesMap[id] || id).join(", ");
  };

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
                <time
                  className="card-footer-item"
                  dateTime={article.created_at}
                >
                  <p>Creado: {new Date(article.created_at).toLocaleString()}</p>
                </time>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  Categories:{" "}
                  {article.categories
                    ? getCategoryNames(article.categories)
                    : "N/A"}
                </p>
                <p className="card-footer-item">
                  Tags: {article.tags ? article.tags.join(", ") : "N/A"}
                </p>
                <p className="card-footer-item">
                  Reactions:{" "}
                  {article.reactions ? article.reactions.join(", ") : "N/A"}
                </p>
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
