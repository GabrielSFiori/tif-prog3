import React, { useState, useEffect } from "react";
import { fetchComments, editComment } from "../../hooks/Conncomments";

const ViewComments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { comments } = await fetchComments(articleId);
        setComments(comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [articleId]);

  const handleEditComment = async (id, newContent) => {
    try {
      const updatedComment = await editComment(id, newContent);
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, content: newContent } : comment
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error}</p>;

  return (
    <div>
      <p className="title has-text-centered has-1">Comments</p>
      
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="card">
            <div className="card-content">
              <p>{comment.content}</p>
              <p><strong>Author:</strong> {comment.author}</p>
              <p><small>Posted on: {new Date(comment.created_at).toLocaleString()}</small></p>
              <button onClick={() => handleEditComment(comment.id, prompt("Edit your comment:", comment.content))}>
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No se encontraron comentarios.</p>
      )}
    </div>
  );
};

export default ViewComments;
