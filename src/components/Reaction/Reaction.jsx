import React, { useState, useEffect } from 'react';
import { fetchReactions } from '../../hooks/ConReactions';
import "./Styles/Reactions.css"


const Reactions = ({ onClick }) => {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReactions = async () => {
      try {
        const data = await fetchReactions();
        setReactions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadReactions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const getButtonText = (reaction) => {
    return reaction.name === 'Me gusta' ? 'Me gusta' : 'No me gusta';
  };

  return (
    <div className="reaction-list">
      <h1>Reactions</h1>
      <ul>
        {reactions.map((reaction) => (
          <li key={reaction.id} className="reaction-list-item">
            <h2 className="reaction-name">{reaction.name}</h2>
            <p className="reaction-description">{reaction.description}</p>
            {reaction.icon && (
              <img
                src={reaction.icon}
                alt={`${reaction.name} icon`}
                className="reaction-icon"
              />
            )}
            {reaction.font_awesome_icon && (
              <i
                className={`fa ${reaction.font_awesome_icon}`}
                aria-hidden="true"
              />
            )}
            <div>
              <button
                className="reaction-button"
                onClick={() => onClick(reaction.id)}
              >
                {getButtonText(reaction)}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reactions;