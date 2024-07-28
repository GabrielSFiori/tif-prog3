export const fetchArticles = async () => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    "https://sandbox.academiadevelopers.com/infosphere/articles/",
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
  return data;
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

// src/hooks/ConnApi.js
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

  const data = await response.json();
  return data;
};

export async function fetchDetailArticle(id) {
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

export async function fetchUpdateArticle(id, article) {
  const urlBase = `https://sandbox.academiadevelopers.com/infosphere/articles/${id}`;
  try {
    const response = await fetch(urlBase, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchDeleteArticle(id) {
  const urlBase = `https://sandbox.academiadevelopers.com/infosphere/articles/${id}`;
  try {
    const response = await fetch(urlBase, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchCategories() {
  const urlBase =
    "https://sandbox.academiadevelopers.com/infosphere/categories/";
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
