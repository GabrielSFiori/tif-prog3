import React, { useState, useEffect } from "react";
import { fetchArticles } from "../hooks/ConnApi.jsx";
import { Home } from "./Home/Home.jsx";

export const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const { articles } = await fetchArticles(page);
        setArticles(articles);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    loadArticles();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Home
      articles={articles}
      onPageChange={handlePageChange}
      currentPage={page}
    />
  );
};

export default HomeScreen;
