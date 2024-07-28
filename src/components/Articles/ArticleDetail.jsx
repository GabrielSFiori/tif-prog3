import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCategories } from "../../hooks/ConnApi";

export const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getArticleAndCategories() {
      try {
        // Fetch the article
        const articleData = await fetchArticleById(id);
        setArticle(articleData);
        setCategories(articleData.categories);

        // Fetch categories and create a map
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
    <div className="container" style={{ marginTop: "3rem" }}>
      <h1 className="title is-4 has-text-centered">{article.title}</h1>
      <div className="content">
        {article.image && (
          <figure className="image">
            <img
              src={article.image}
              alt={article.caption || "Placeholder image"}
              style={{ width: "100%" }}
            />
          </figure>
        )}
        <p>{article.abstract}</p>
        <p>{article.content}</p>
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
            {article.categories ? getCategoryNames(article.categories) : "N/A"}
          </p>
          <p className="card-footer-item">
            Tags: {article.tags ? article.tags.join(", ") : "N/A"}
          </p>
          <p className="card-footer-item">
            Reactions:{" "}
            {article.reactions ? article.reactions.join(", ") : "N/A"}
          </p>
          <button
            className="card-footer-item"
            onClick={() => handleReadMore(article.id)}
          >
            Read More
          </button>
          <a href="#" className="card-footer-item">
            Edit
          </a>
          <a href="#" className="card-footer-item">
            Delete
          </a>
        </footer>
      </div>
    </div>
  );
};
