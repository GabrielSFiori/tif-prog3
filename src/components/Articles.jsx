import React, { useState, useEffect } from "react";
import { fetchArticles, fetchCategories } from "../hooks/ConnApi";
import { useNavigate } from "react-router-dom";
import { ViewArticles } from "./Articles/ViewArticles";

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
          fetchCategories(),
        ]);
        setArticles(articlesData);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
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

  const categoriesMap = Array.isArray(categories)
    ? categories.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
      }, {})
    : {};

  const getCategoryNames = (categories) => {
    return categories.map((id) => categoriesMap[id] || id).join(", ");
  };

  return (
    <ViewArticles
      articles={articles}
      categories={categories}
      categoriesMap={categoriesMap}
      getCategoryNames={getCategoryNames}
    />
  );
};
