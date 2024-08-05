import { useState, useEffect } from "react";
import {
  fetchArticleById,
  fetchCategories,
  fetchUpdateArticle,
  fetchUpdateArticleCategory,
} from "./ConnApi";

const useArticleCategory = (articleId) => {
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        if (articleId) {
          const articleData = await fetchArticleById(articleId);
          setArticle(articleData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [articleId]);

  const updateArticle = async (formData) => {
    try {
      const updatedArticle = await fetchUpdateArticle(articleId, formData);
      setArticle(updatedArticle);
      return updatedArticle;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateArticleCategories = async (
    categoriesToAdd,
    categoriesToRemove
  ) => {
    try {
      // Primero, eliminamos las categorías que ya no deben estar asociadas
      for (const catId of categoriesToRemove) {
        // Obtén la relación específica si es necesario. Aquí se asume que la API
        // tiene un endpoint que acepta el ID de relación para eliminar.
        await fetchUpdateArticleCategory(catId, {
          article: articleId,
          category: catId,
        });
      }

      // Luego, añadimos las nuevas categorías
      for (const catId of categoriesToAdd) {
        await fetchUpdateArticleCategory(catId, {
          article: articleId,
          category: catId,
        });
      }

      setSuccess("Categories updated successfully!");
    } catch (error) {
      console.error(
        "Error updating categories:",
        error.response ? error.response.data : error.message
      );
      setError("An error occurred while updating categories.");
    }
  };

  return {
    article,
    categories,
    error,
    success,
    updateArticle,
    updateArticleCategories,
  };
};

export default useArticleCategory;
