import React, { useState, useEffect } from "react";
import { fetchComments, createComment } from "../../hooks/Conncomments";

const ViewComments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");

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

  const handleCreateComment = async () => {
    try {
      const createdComment = await createComment(articleId, newComment);
      setComments([createdComment, ...comments]); // Añadir el nuevo comentario al inicio de la lista
      setNewComment(""); // Limpiar el campo de texto después de crear el comentario
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error}</p>;

  return (
    <div>
      <p className="title has-text-centered has-1">Comments</p>
      
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button onClick={handleCreateComment}>Create Comment</button>
      </div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="card">
            <div className="card-content">
              <p>{comment.content}</p>
              <p><strong>Author:</strong> {comment.author}</p>
              <p><small>Posted on: {new Date(comment.created_at).toLocaleString()}</small></p>
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
