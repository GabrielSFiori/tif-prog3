import React, { useState, useEffect } from "react";
import { fetchComments } from "../../hooks/Conncomments";

const ViewComments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { comments, nextPage, prevPage } = await fetchComments(
          articleId,
          page
        );
        setComments(comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [articleId, page]);

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
              <p>
                <strong>Author:</strong> {comment.author}
              </p>
              <p>
                <small>
                  Posted on: {new Date(comment.created_at).toLocaleString()}
                </small>
              </p>
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