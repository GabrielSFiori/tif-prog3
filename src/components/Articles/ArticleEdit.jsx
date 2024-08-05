import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchArticleById,
  fetchCategories,
  fetchUpdateArticle,
  fetchUpdateArticleCategory,
} from "../../hooks/ConnApi";
import { AuthContext } from "../../contexts/AuthContext";
import CategoryDropdown from "../Category/CategoryDropdown";
import "./styles/ArticleEdit.css";

export const ArticleEdit = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    content: "",
    image: null,
    caption: "",
    categories: [],
  });
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const articleData = await fetchArticleById(id);
        setArticle(articleData);

        setFormData({
          title: articleData.title || "",
          abstract: articleData.abstract || "",
          content: articleData.content || "",
          image: null,
          caption: articleData.caption || "",
          categories: articleData.categories || [],
        });
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prevFormData) => {
      const isAlreadySelected = prevFormData.categories.some(
        (selected) => selected === category.id
      );

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
      const updatedArticle = await fetchUpdateArticle(id, updatedFormData);

      const existingCategories = article.categories || [];
      const newCategories = formData.categories || [];

      const categoriesToRemove = existingCategories.filter(
        (catId) => !newCategories.includes(catId)
      );
      const categoriesToAdd = newCategories.filter(
        (catId) => !existingCategories.includes(catId)
      );

      for (const catId of categoriesToRemove) {
        await fetchUpdateArticleCategory(id, {
          article: updatedArticle.id,
          category: catId,
          action: "remove",
        });
      }

      for (const catId of categoriesToAdd) {
        await fetchUpdateArticleCategory(id, {
          article: updatedArticle.id,
          category: catId,
          action: "add",
        });
      }

      setSuccess("Article and categories updated successfully!");
      navigate(`/article/${id}`);
    } catch (error) {
      setError(error.message);
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
