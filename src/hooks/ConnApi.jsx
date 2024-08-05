export const fetchArticles = async (page = 1) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(
    `https://sandbox.academiadevelopers.com/infosphere/articles/?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los artículos");
  }

  const data = await response.json();

  return {
    articles: data.results,
    totalCount: data.count,
    nextPage: data.next ? new URL(data.next).searchParams.get("page") : null,
    prevPage: data.previous
      ? new URL(data.previous).searchParams.get("page")
      : null,
  };
};

export async function fetchArticleById(id) {
  const urlBase = `https://sandbox.academiadevelopers.com/infosphere/articles/${id}`;
  try {
    const response = await fetch(urlBase);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export const fetchCreateArticle = async (articleData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    "https://sandbox.academiadevelopers.com/infosphere/articles/",
    {
      method: "POST",
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
      body: articleData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al crear el artículo");
  }

  return await response.json();
};

export const fetchUpdateArticle = async (id, formData) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: token ? `Token ${token}` : "",
          // 'Content-Type': 'multipart/form-data', // Normalmente no se establece el Content-Type en la solicitud cuando se usa FormData
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `An error occurred while updating the article: ${errorDetails}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const fetchDeleteArticle = async (id) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al eliminar el artículo");
    }

    return {};
  } catch (error) {
    console.error("Error al eliminar el artículo:", error);
    throw new Error(error.message);
  }
};

export async function fetchCategories() {
  const urlBase =
    "https://sandbox.academiadevelopers.com/infosphere/categories/";
  try {
    const response = await fetch(urlBase, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const fetchCreateArticleCategory = async (data) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(
    "https://sandbox.academiadevelopers.com/infosphere/article-categories/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Error al crear la categoría del artículo"
    );
  }

  return await response.json();
};

export const fetchUpdateArticleCategory = async (articleId, categoryId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/infosphere/article-categories/${articleId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: token ? `Token ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article: articleId,
          category: categoryId,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Response status: ${response.status}`);
      console.error(`Response body: ${errorText}`);
      throw new Error(`Error updating article categories: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating article categories:", error);
    throw error;
  }
};
