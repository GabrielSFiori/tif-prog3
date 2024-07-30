import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ArticleDetail.css";

export const ViewArticles = ({
  articles,
  categories,
  categoriesMap,
  getCategoryNames,
  onPageChange,
  prevPage,
  nextPage,
  totalCount,
  currentPage,
}) => {
  const navigate = useNavigate();

  const handleReadMore = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="container background">
      <div className="columns is-multiline">
        {articles.length > 0 ? (
          articles.map((article) => (
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
                        {article.categories
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
      <div className="pagination">
        <button
          className="button is-info mt-3"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="icon">
            <i className="fas fa-arrow-left"></i>
          </span>
          <span className="page-info">Previous</span>
        </button>
        <span className="page-info">
          Page {currentPage} of {Math.ceil(totalCount / 10)}
        </span>
        <button
          className="button is-info mt-3"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalCount / 10)}
        >
          <span className="page-info">Next</span>
          <span className="icon">
            <i className="fas fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </div>
  );
};
