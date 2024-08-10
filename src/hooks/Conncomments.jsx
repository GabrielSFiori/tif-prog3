export const fetchComments = async (articleId, page = 1) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `https://sandbox.academiadevelopers.com/infosphere/comments/?article=${articleId}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los comentarios");
  }

  const data = await response.json();

  return {
    comments: data.results,
    totalCount: data.count,
    nextPage: data.next ? new URL(data.next).searchParams.get("page") : null,
    prevPage: data.previous
      ? new URL(data.previous).searchParams.get("page")
      : null,
  };
};

export const deleteComment = async (commentId) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `https://sandbox.academiadevelopers.com/infosphere/comments/${commentId}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.status === 204;
};

export const updateComment = async (commentId, updatedContent) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `https://sandbox.academiadevelopers.com/infosphere/comments/${commentId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify({ content: updatedContent }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const createComment = async (articleId, content) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `https://sandbox.academiadevelopers.com/infosphere/comments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify({
        content,
        article: articleId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
