import { useState, useEffect } from "react";

export const useFetchUsers = (initialPage = 1) => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/users/profiles/?page=${currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error when obtaining profiles");
      }

      const data = await response.json();

      setUsers(data.results);
      setTotalCount(data.count);
      setNextPage(
        data.next ? new URL(data.next).searchParams.get("page") : null
      );
      setPrevPage(
        data.previous ? new URL(data.previous).searchParams.get("page") : null
      );
    };

    fetchUsers();
  }, [currentPage]);

  return { users, totalCount, nextPage, prevPage, setCurrentPage, currentPage };
};

export const useFetchProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/users/profiles/profile_data/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        setError("Error getting profile");
        return;
      }

      const data = await response.json();
      setProfile(data);

      localStorage.setItem("userId", data.user__id);
    };

    fetchProfile();
  }, []);

  return { profile, error };
};

export const useFetchEditProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = userId || localStorage.getItem("userId");

    if (!id) {
      setError("User ID no proporcionado");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(
          `https://sandbox.academiadevelopers.com/users/profiles/${id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Token ${token}` : "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener el perfil");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const updateProfile = async (formData) => {
    const id = userId || localStorage.getItem("userId");

    if (!id) {
      setError("User ID no proporcionado");
      return;
    }

    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/users/profiles/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: token ? `Token ${token}` : "",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil");
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return { profile, error, loading, updateProfile };
};
