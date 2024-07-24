import React, { useState, useEffect } from "react";

const ConnApi = () => {
  const urlBase = "https://sandbox.academiadevelopers.com/infosphere/articles/";
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await fetch(urlBase);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      }
    }
    getArticles();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div className="card" key={index} style={{ marginBottom: "1rem" }}>
            <header className="card-header">
              <p className="card-header-title">{article.title}</p>
              <button className="card-header-icon" aria-label="more options">
                <span className="icon">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </header>
            <div className="card-content">
              <div className="content">
                {article.content}
                <br />
                <time dateTime={article.created_at}>
                  {new Date(article.created_at).toLocaleString()}
                </time>
              </div>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item">
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
  );
};

export default ConnApi;
