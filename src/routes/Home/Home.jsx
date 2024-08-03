import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/HomeScreen.css";
import { DarkModeContext } from "../../contexts/DarkModeProvider";
import fetchWeather from "./Hooks/Conections";

export const Home = ({ articles = [] }) => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const { theme, toggleTheme } = useContext(DarkModeContext);

  const handleReadMore = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      const { latitude, longitude } = JSON.parse(savedLocation);
      setLocation({ latitude, longitude });
      fetchWeather(latitude, longitude, setWeather);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        setLocation(newLocation);
        localStorage.setItem("location", JSON.stringify(newLocation));
        fetchWeather(latitude, longitude, setWeather);
      });
    } else {
      console.log("Geolocation is not available");
    }
  }, []);

  const limitContentToThreeParagraphs = (content) => {
    const paragraphs = content
      .split("\n")
      .filter((paragraph) => paragraph.trim() !== "");
    return paragraphs.slice(0, 1).join("\n");
  };

  const sortedArticles = articles.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div
      className={`home-container container ${
        theme === "dark" ? "is-dark" : "is-light"
      }`}
    >
      <div className="columns is-multiline">
        <div className="column is-one-third-desktop is-full-mobile">
          <div
            className={`weather-section box weather${
              theme === "dark" ? "is-dark" : "is-light"
            }`}
          >
            {weather ? (
              <div className="weather-container">
                <h3 className="title is-4">Weather in {weather.name}</h3>
                <img
                  className="weather-icon"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Condition: {weather.weather[0].description}</p>
              </div>
            ) : (
              <p>Loading weather...</p>
            )}
          </div>
        </div>

        <div className="column is-two-thirds-desktop is-full-mobile">
          <div
            className={`carousel-container box ${
              theme === "dark" ? "is-dark" : "is-light"
            }`}
          >
            <Carousel showThumbs={false} infiniteLoop autoPlay>
              {sortedArticles.length > 0 ? (
                sortedArticles.slice(0, 4).map((article) => (
                  <div
                    key={article.id}
                    className={`carousel-item box ${
                      theme === "dark" ? "is-dark" : "is-light"
                    }`}
                  >
                    <div className="card-image">
                      {article.image ? (
                        <figure className="image-container-home">
                          <img
                            className="image is-fullwidth"
                            src={article.image}
                            alt={article.caption || "Placeholder image"}
                          />
                        </figure>
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    <div className="carousel-caption">
                      <h3 className="title is-5">{article.title}</h3>
                      <p>{limitContentToThreeParagraphs(article.content)}</p>
                      <button
                        className="button is-primary"
                        onClick={() => handleReadMore(article.id)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No articles found.</div>
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
