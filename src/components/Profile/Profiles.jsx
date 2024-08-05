import React, { useContext } from "react";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { DarkModeContext } from "../../contexts/DarkModeProvider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../routes/styles/HomeScreen.css";

export const Profile = () => {
  const { users, totalCount, nextPage, prevPage, setCurrentPage, currentPage } =
    useFetchUsers();
  const { theme } = useContext(DarkModeContext);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className={`profile-container container ${
        theme === "dark" ? "is-dark" : "is-light"
      }`}
    >
      <h1 className="title">Profiles</h1>
      <p>Total de usuarios: {totalCount}</p>
      <div className="columns is-multiline">
        {users.map((user) => (
          <div className="column is-one-third" key={user.user__id}>
            <div
              className={`card ${theme === "dark" ? "is-dark" : "is-light"}`}
            >
              <div className="card-content">
                <p className="title is-4">{user.username}</p>
                <p className="subtitle is-6">{user.email}</p>
                <p>
                  {user.first_name} {user.last_name}
                </p>
                {user.image && (
                  <figure className="image is-128x128">
                    <img src={user.image} alt={`${user.username}'s profile`} />
                  </figure>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination mb-1">
        <button
          className="button is-info mt-3 mb-3"
          onClick={() => handlePageChange(prevPage)}
          disabled={!prevPage}
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
          onClick={() => handlePageChange(nextPage)}
          disabled={!nextPage}
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
