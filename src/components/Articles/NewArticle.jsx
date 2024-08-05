import React, { useState, useEffect } from "react";
import {
  fetchCreateArticle,
  fetchCategories,
  fetchCreateArticleCategory,
} from "../../hooks/ConnApi";
import CategoryDropdown from "../Category/CategoryDropdown";

export const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [content, setContent] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function getCategories() {
      try {
        const data = await fetchCategories();

        setCategories(data);
      } catch (error) {
        setError("Failed to load categories: " + error.message);
      }
    }

    getCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("abstract", abstract);
    formData.append("content", content);
    formData.append("caption", caption);
    if (image) {
      formData.append("image", image);
    }

    try {
      const articleData = await fetchCreateArticle(formData);

      for (const category of selectedCategories) {
        await fetchCreateArticleCategory({
          article: articleData.id,
          category: category.id,
        });
      }

      setSuccess("Article created successfully!");
      setTitle("");
      setAbstract("");
      setContent("");
      setCaption("");
      setImage(null);
      setSelectedCategories([]);
      setError(null);
    } catch (error) {
      setError("Failed to create article: " + error.message);
      setSuccess(null);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prevCategories) => {
      const isAlreadySelected = prevCategories.some(
        (selected) => selected.id === category.id
      );

      if (isAlreadySelected) {
        return prevCategories.filter((selected) => selected.id !== category.id);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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
          <label htmlFor="categories">Categories</label>
          <CategoryDropdown
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        <div className="field">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="input"
            id="image"
            onChange={handleImageChange}
          />
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
