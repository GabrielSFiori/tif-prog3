import React, { useState, useEffect, useRef } from "react";
import { fetchArticles, fetchCategories } from "../hooks/ConnApi";
import { useNavigate } from "react-router-dom";
import { ViewArticles } from "./Articles/ViewArticles";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const navigate = useNavigate();
  const myRef = useRef(null);

  useEffect(() => {
    async function getArticlesAndCategories() {
      try {
        const {
          articles: articlesData,
          totalCount,
          nextPage,
          prevPage,
        } = await fetchArticles(currentPage);
        setArticles(articlesData);
        setTotalCount(totalCount);
        setNextPage(nextPage);
        setPrevPage(prevPage);
        const categoriesData = await fetchCategories();
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
  }, [currentPage, navigate]);

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

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / 10)) {
      setCurrentPage(newPage);
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={myRef}>
      <ViewArticles
        articles={articles}
        categories={categories}
        categoriesMap={categoriesMap}
        getCategoryNames={getCategoryNames}
        onPageChange={handlePageChange}
        prevPage={prevPage}
        nextPage={nextPage}
        totalCount={totalCount}
        currentPage={currentPage}
      />
    </div>
  );
};
