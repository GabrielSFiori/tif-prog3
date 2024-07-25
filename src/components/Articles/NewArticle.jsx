import React, { useState } from "react";
import { fetchCreateArticle } from "../../hooks/ConnApi";

export const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [content, setContent] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newArticle = {
      title,
      abstract,
      content,
      caption,
    };

    try {
      const data = await fetchCreateArticle(newArticle);
      setSuccess("Article created successfully!");
      setTitle("");
      setAbstract("");
      setContent("");
      setCaption("");
      setError(null);
    } catch (error) {
      setError("Failed to create article: " + error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container">
      <h1 className="title">New Article</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="input"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="abstract">Abstract</label>
          <textarea
            className="textarea"
            id="abstract"
            value={abstract}
            onChange={(event) => setAbstract(event.target.value)}
          ></textarea>
        </div>

        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            className="textarea"
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          ></textarea>
        </div>

        <div className="field">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            className="input"
            id="caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
        </div>

        <button type="submit" className="button is-link">
          Submit
        </button>
      </form>
    </div>
  );
};
