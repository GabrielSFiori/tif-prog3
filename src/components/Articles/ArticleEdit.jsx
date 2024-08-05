import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryDropdown from "../Category/CategoryDropdown";
import useArticleCategory from "../../hooks/useArticleCategory";

export const ArticleEdit = () => {
  const { id } = useParams();
  const {
    article,
    categories,
    error,
    success,
    updateArticle,
    updateArticleCategories,
  } = useArticleCategory(id);
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    content: "",
    image: null,
    caption: "",
    categories: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        abstract: article.abstract || "",
        content: article.content || "",
        image: null,
        caption: article.caption || "",
        categories: article.categories || [],
      });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prevFormData) => {
      const isAlreadySelected = prevFormData.categories.includes(category.id);

      return {
        ...prevFormData,
        categories: isAlreadySelected
          ? prevFormData.categories.filter((catId) => catId !== category.id)
          : [...prevFormData.categories, category.id],
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: file,
        }));
      } else {
        alert("Please select a valid image file (max size: 5MB)");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append("title", formData.title);
    updatedFormData.append("abstract", formData.abstract || "");
    updatedFormData.append("content", formData.content);
    updatedFormData.append("caption", formData.caption || "");

    if (formData.image) {
      updatedFormData.append("image", formData.image);
    }

    try {
      const updatedArticle = await updateArticle(updatedFormData);

      // Actualiza las categorías del artículo
      const existingCategories = article.categories || [];
      const newCategories = formData.categories || [];

      const categoriesToRemove = existingCategories.filter(
        (catId) => !newCategories.includes(catId)
      );
      const categoriesToAdd = newCategories.filter(
        (catId) => !existingCategories.includes(catId)
      );

      if (categoriesToRemove.length > 0 || categoriesToAdd.length > 0) {
        await updateArticleCategories(categoriesToAdd, categoriesToRemove);
      }

      navigate(`/article/${id}`);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Edit Article</h1>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="input"
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="abstract">Abstract</label>
          <textarea
            className="textarea"
            id="abstract"
            name="abstract"
            value={formData.abstract || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            className="textarea"
            id="content"
            name="content"
            value={formData.content || ""}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="field">
          <label htmlFor="categories">Categories</label>
          <CategoryDropdown
            categories={categories}
            selectedCategories={categories.filter((category) =>
              formData.categories.includes(category.id)
            )}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        <div className="field">
          <label htmlFor="image">Image</label>
          {article.image && (
            <figure className="image">
              <img
                src={article.image}
                alt={formData.caption || "Article image"}
                style={{ width: "100px", height: "100px" }}
              />
            </figure>
          )}
          <input
            type="file"
            className="input"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>

        <div className="field">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            className="input"
            id="caption"
            name="caption"
            value={formData.caption || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="button is-link">
          Save Changes
        </button>
      </form>
      <div className="has-text-centered">
        <button
          className="button is-info is-dark"
          onClick={() => navigate(`/article/${id}`)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
