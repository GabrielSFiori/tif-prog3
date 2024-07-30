import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticleById,
  fetchCategories,
  fetchDeleteArticle,
} from "../../hooks/ConnApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./styles/ArticleDetail.css";

export const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/article/edit-article/${article.id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmDelete) {
      try {
        await fetchDeleteArticle(article.id, auth.token);
        navigate("/articles");
      } catch (error) {
        console.error("Error deleting article:", error);
        setError(error.message);
      }
    }
  };

  const handleBack = () => {
    navigate("/articles");
  };

  useEffect(() => {
    async function getArticleAndCategories() {
      try {
        const articleData = await fetchArticleById(id);
        setArticle(articleData);
        setCategories(articleData.categories);

        const categoriesData = await fetchCategories();
        const categoriesMap = categoriesData.reduce((map, category) => {
          map[category.id] = category.name;
          return map;
        }, {});
        setCategoriesMap(categoriesMap);
      } catch (error) {
        setError(error.message);
      }
    }
    getArticleAndCategories();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  const getCategoryNames = (categoryIds) => {
    return categoryIds.map((id) => categoriesMap[id] || id).join(", ");
  };

  return (
    <div className="container">
      <h1 className="title is-4">{article.title}</h1>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {article.image ? (
            <figure className="image-container">
              <img
                src={article.image}
                alt={article.caption || "Placeholder image"}
              />
            </figure>
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <p>{article.abstract}</p>
        <div
          className="container"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",

            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <p>{article.content}</p>
        </div>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">Author: {article.author}</p>
        <p className="card-footer-item">Views: {article.view_count}</p>
        <time className="card-footer-item" dateTime={article.created_at}>
          <p>Created: {new Date(article.created_at).toLocaleString()}</p>
        </time>
      </footer>
      <footer className="card-footer">
        <p className="card-footer-item">
          Categories:{" "}
          {article.categories ? getCategoryNames(article.categories) : "N/A"}
        </p>
        <p className="card-footer-item">
          Tags: {article.tags ? article.tags.join(", ") : "N/A"}
        </p>
        <p className="card-footer-item">
          Reactions: {article.reactions ? article.reactions.join(", ") : "N/A"}
        </p>
      </footer>

      <div className="has-text-centered">
        <button className="button is-info is-dark " onClick={handleBack}>
          Go Back
        </button>
        {auth.isAuthenticated && (
          <>
            <a className="button is-info ml-4" onClick={handleEdit}>
              Edit
            </a>
            <a className="button is-danger ml-4" onClick={handleDelete}>
              Delete
            </a>
          </>
        )}
      </div>
    </div>
  );
};
