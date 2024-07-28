import React from "react";
import { useNavigate } from "react-router-dom";

export const ViewArticles = ({
  articles,
  categories,
  categoriesMap,
  getCategoryNames,
}) => {
  const navigate = useNavigate();

  const handleReadMore = (articleId) => {
    navigate(`/article/${articleId}`);
  };

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
                className="title is-5 is-centered"
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
                {article.abstract && <p>{article.abstract}</p>}
                <p>{article.content}</p>
                <br />
              </div>
            </div>
            <div className="card-footer">
              <p className="card-footer-item">Author: {article.author}</p>
              <p className="card-footer-item">Views: {article.view_count}</p>
              <time className="card-footer-item" dateTime={article.created_at}>
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

              <button
                className="button is-primary mt-1 ml-1"
                onClick={() => handleReadMore(article.id)}
              >
                Read More
              </button>
            </footer>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
