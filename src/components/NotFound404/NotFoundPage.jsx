import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <img
        src="https://example.com/not-found-image.png"
        alt="Not Found"
        className="not-found-image"
      />
      <h1 className="not-found-message">404 - Not Found</h1>
      <p className="not-found-description">
        Lo sentimos, no se encontraron artículos.
      </p>
      <button className="button is-primary" onClick={handleGoBack}>
        Volver Atrás
      </button>
    </div>
  );
};

export default NotFoundPage;
