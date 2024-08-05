import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchEditProfile } from "../../hooks/useFetchUsers";
import "./styles/ProfileScreen.css";

export const EditProfile = () => {
  const { userId } = useParams();
  const storedUserId = localStorage.getItem("userId");
  const id = userId || storedUserId;
  console.log("User ID:", id);
  const { profile, error, loading, updateProfile } = useFetchEditProfile(id);
  const [formData, setFormData] = useState(new FormData());

  useEffect(() => {
    if (profile) {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("first_name", profile.first_name || "");
      formData.append("last_name", profile.last_name || "");
      formData.append("email", profile.email || "");
      formData.append("dob", profile.dob || "");
      formData.append("bio", profile.bio || "");
      formData.append("image", profile.image || "");
      setFormData(formData);
    }
  }, [profile]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      formData.append(name, files[0]);
    } else {
      formData.set(name, value);
    }
    setFormData(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };
  return (
    <div className="edit-profile-container container">
      <h1 className="title">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="username"
              value={profile.username || ""}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="first_name"
              value={profile.first_name || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="last_name"
              value={profile.last_name || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Date of Birth</label>
          <div className="control">
            <input
              className="input"
              type="date"
              name="dob"
              value={profile.dob || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Bio</label>
          <div className="control">
            <textarea
              className="textarea"
              name="bio"
              value={profile.bio || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Profile Image</label>
          <div className="control">
            <input
              className="input"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
