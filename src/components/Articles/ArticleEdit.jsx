import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchArticleById,
  fetchCategories,
  fetchUpdateArticle,
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
          categories: categoriesData.categories || [],
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
        (selected) => selected.id === category.id
      );

      if (isAlreadySelected) {
        return {
          ...prevFormData,
          categories: prevFormData.categories.filter(
            (selected) => selected.id !== category.id
          ),
        };
      } else {
        return {
          ...prevFormData,
          categories: [...prevFormData.categories, category],
        };
      }
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

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("abstract", formData.abstract);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("caption", formData.caption);
    formDataToSend.append(
      "categories",
      JSON.stringify(formData.categories.map((cat) => cat.id)) // Sending only IDs of categories
    );

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await fetchUpdateArticle(id, formDataToSend);
      setSuccess("Article updated successfully!");
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
            selectedCategories={formData.categories}
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
