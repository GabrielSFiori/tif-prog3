import React, { useContext } from "react";
import { useFetchProfile } from "../../hooks/useFetchUsers";
import { DarkModeContext } from "../../contexts/DarkModeProvider";
import "./styles/ProfileScreen.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const ProfileDetail = () => {
  const { profile, error } = useFetchProfile();
  const { theme } = useContext(DarkModeContext);

  const { userId } = useParams();

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div
      className={`profile-detail-container container ${
        theme === "dark" ? "is-dark" : "is-light"
      }`}
    >
      <div className="card">
        <div className="card-image">
          {profile.image ? (
            <figure className="image is-128x128">
              <img src={profile.image} alt={`${profile.username}'s profile`} />
            </figure>
          ) : (
            <div className="image-placeholder">
              <p>No Image Available</p>
            </div>
          )}
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{profile.username}</p>
              <p className="title is-6">{profile.email}</p>
            </div>
          </div>

          <div className="content">
            {profile.first_name && (
              <p>
                <strong>First Name:</strong> {profile.first_name}
              </p>
            )}
            {profile.last_name && (
              <p>
                <strong>Last Name:</strong> {profile.last_name}
              </p>
            )}
            {profile.dob && (
              <p>
                <strong>Date of Birth:</strong> {profile.dob}
              </p>
            )}
            {profile.bio && (
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
            )}
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(profile.created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(profile.updated_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <Link className="button is-link" to={`/users/profiles/${userId}`}>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
