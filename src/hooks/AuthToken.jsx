export async function fetchAuthToken(username, password) {
  const urlBase = "https://sandbox.academiadevelopers.com/api-auth/";
  try {
    const response = await fetch(urlBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || "Failed to authenticate"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
