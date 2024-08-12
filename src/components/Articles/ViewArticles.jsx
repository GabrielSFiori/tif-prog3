import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ArticleDetail.css";
import { SearchAndSort } from "../SearchAndSort/SearchAndSort";
import NotFoundPage from "../NotFound404/NotFoundPage";

export const ViewArticles = ({
  articles,
  categoriesMap,
  getCategoryNames,
  onPageChange,
  prevPage,
  nextPage,
  totalCount,
  currentPage,
}) => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (articles) {
      setFilteredArticles(articles);
      setError(null);
    } else {
      setError("No se encontraron artículos.");
    }
  }, [articles]);

  const handleReadMore = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const onSearch = async ({ title, categories, ordering }) => {
    try {
      const queryParams = {
        title: title || "",
        categories: categories || "",
        ordering: ordering || "",
        page: currentPage,
        page_size: 10,
      };

      const query = new URLSearchParams(queryParams).toString();
      const url = `https://sandbox.academiadevelopers.com/infosphere/articles/?${query}`;

      const response = await fetch(url);

      if (response.status === 404) {
        setError("No se encontraron artículos.");
        setFilteredArticles([]);
        return;
      }

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Network response was not ok: ${errorDetails}`);
      }

      const data = await response.json();
      setFilteredArticles(data.results || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setFilteredArticles([]);
      setError("Error al obtener los artículos.");
    }
  };

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div className="container background">
      <SearchAndSort categoriesMap={categoriesMap} onSearch={onSearch} />
      <div className="columns is-multiline">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div className="column is-one-third" key={article.id}>
              <div className="card">
                <header className="card-header">
                  <p className="title is-5">{article.title}</p>
                </header>
                <div className="card-image-container">
                  {article.image ? (
                    <figure className="image-container-view">
                      <img
                        src={article.image}
                        alt={article.caption || "Placeholder image"}
                      />
                    </figure>
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="card-content">
                  <div className="content">
                    <div
                      className="content-clamp"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "2",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <p>{article.content}</p>
                    </div>
                  </div>
                </div>
                <div className="article-details-container">
                  <ul className="article-details-list">
                    <li className="article-detail-item">
                      <p>Author: {article.author}</p>
                    </li>
                    <li className="article-detail-item">
                      <p>Views: {article.view_count}</p>
                    </li>
                    <li className="article-detail-item">
                      <p>
                        Categories:{" "}
                        {article.categories.length > 0
                          ? getCategoryNames(article.categories)
                          : "N/A"}
                      </p>
                    </li>
                    <li className="article-detail-item">
                      <p>
                        Tags: {article.tags ? article.tags.join(", ") : "N/A"}
                      </p>
                    </li>
                    <li className="article-detail-item">
                      <p>
                        Reactions:{" "}
                        {article.reactions
                          ? article.reactions.join(", ")
                          : "N/A"}
                      </p>
                    </li>
                    <li className="article-detail-item">
                      <p>
                        Created: {new Date(article.created_at).toLocaleString()}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="has-text-centered">
                  <button
                    className="button is-primary"
                    onClick={() => handleReadMore(article.id)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No articles found.</div>
        )}
      </div>
      <div className="pagination mb-1">
        <button
          className="button is-info mt-3 mb-3"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="icon">
            <i className="fas fa-arrow-left"></i>
          </span>
          <span className="page-info"></span>
        </button>
        <span className="page-info mt-3 mb-3" style={{ color: "white" }}>
          Page {currentPage} of {Math.ceil(totalCount / 10)}
        </span>
        <button
          className="button is-info mt-3 mb-3"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalCount / 10)}
        >
          <span className="page-info"></span>
          <span className="icon">
            <i className="fas fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </div>
  );
};
