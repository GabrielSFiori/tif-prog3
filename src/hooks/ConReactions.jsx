export const fetchReactions = async () => {
  const token = localStorage.getItem("authToken");
  const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/reactions/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Token ${token}` : "",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las reacciones");
  }

  const data = await response.json();
  return data.results;
};

export const fetchCountReactions = async () => {
  const token = localStorage.getItem("authToken");
  const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/reactions/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Token ${token}` : "",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener el contador de reacciones");
  }

  const data = await response.json();
  return {
    count: data.count,
  };
};

export const postReaction = async (articleId, reactionType, token, userId) => {
  try {
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/reactions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify({ 
        reaction_type: reactionType, 
        user_id: userId 
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al agregar la reacción: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding reaction:", error);
    throw error;
  }
}

export const deleteReaction = async (articleId, reactionId, token, userId) => {
  try {
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/reactions/${reactionId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la reacción: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting reaction:", error);
    throw error;
  }
}


export const deleteReaction = async (articleId, reactionId, token, userId) => {
  try {
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/reactions/${reactionId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la reacción: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting reaction:", error);
    throw error;
  }
}

