import React, { useState, useEffect } from 'react';
import { fetchReactions } from '../../hooks/ConReactions';
import "./Styles/Reactions.css"

const Reactions = ({ onClick }) => {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userReaction, setUserReaction] = useState(null);

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

  const handleReactionClick = (reactionId) => {
    const isCurrentReaction = userReaction === reactionId;
    const newReaction = isCurrentReaction ? null : reactionId;
    setUserReaction(newReaction);
    onClick(newReaction);
  };

  const getButtonText = (reactionId, isLiked) => {
    return isLiked ? (userReaction === reactionId ? 'No me gusta' : 'Me gusta') : (userReaction === reactionId ? 'Me gusta' : 'No me gusta');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="reaction-list">
      <h1>Reactions</h1>
      <div className='container'>
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
                onClick={() => handleReactionClick(reaction.id)}
              >
                {getButtonText(reaction.id, reaction.name === 'Like')}
              </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Reactions;
