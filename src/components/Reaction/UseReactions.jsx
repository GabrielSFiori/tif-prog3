import { useState, useEffect } from 'react';
import { fetchReactions } from '../../hooks/ConReactions'; // Suponiendo que tienes una función para obtener reacciones

const useReactions = () => {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReactions = async () => {
      try {
        const data = await fetchReactions(); // Llama a tu función para obtener las reacciones
        setReactions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getReactions();
  }, []);

  return { reactions, loading, error };
};

export default useReactions;
