import React, { useState, useEffect } from "react";
import { fetchComments, deleteComment, updateComment, createComment } from "../../hooks/Conncomments";

const ViewComments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

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

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDelete) {
      try {
        await deleteComment(commentId);
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      } catch (err) {
        console.error("Error deleting comment:", err.message);
        setError("Error deleting comment.");
      }
    }
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async () => {
    if (!editContent) {
      alert("Comment content cannot be empty.");
      return;
    }

    try {
      const updatedComment = await updateComment(editCommentId, editContent);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editCommentId ? updatedComment : comment
        )
      );
      setEditCommentId(null);
      setEditContent("");
    } catch (err) {
      console.error("Error updating comment:", err.message);
      setError("Error updating comment.");
    }
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditContent("");
  };

  const handleAddComment = async () => {
    if (!newCommentContent) {
      alert("Comment content cannot be empty.");
      return;
    }

    try {
      const newComment = await createComment(articleId, newCommentContent);
      setComments((prevComments) => [newComment, ...prevComments]);
      setNewCommentContent("");
      setShowAddCommentForm(false);
    } catch (err) {
      console.error("Error adding comment:", err.message);
      setError("Error adding comment.");
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error}</p>;

  return (
    <div>
      <p className="title has-text-centered">Comments</p>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="card" style={{ marginBottom: "1rem" }}>
            <div className="card-content" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1 }}>
                {editCommentId === comment.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows="3"
                      cols="50"
                      placeholder="Edit your comment..."
                    />
                    <div style={{ marginTop: "10px" }}>
                      <button className="button is-info is-small mr-2" onClick={handleUpdateComment}>
                        Save
                      </button>
                      <button className="button is-light is-small" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{comment.content}</p>
                    <p>
                      <strong>Author:</strong> {comment.author}
                    </p>
                    <p>
                      <small>
                        Posted on: {new Date(comment.created_at).toLocaleString()}
                      </small>
                    </p>
                    <div style={{ marginTop: "10px" }}>
                      <button
                        className="button is-info is-small mr-2"
                        onClick={() => handleEditComment(comment)}
                      >
                        Edit
                      </button>
                      <button
                        className="button is-danger is-small"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No comments found.</p>
      )}

      {showAddCommentForm ? (
        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="card-content">
            <textarea
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              rows="3"
              cols="50"
              placeholder="Write a new comment..."
            />
            <div style={{ marginTop: "10px" }}>
              <button className="button is-info is-small mr-2" onClick={handleAddComment}>
                Add Comment
              </button>
              <button
                className="button is-light is-small"
                onClick={() => setShowAddCommentForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="has-text-centered" style={{ marginTop: "1rem" }}>
          <button className="button is-info is-small" onClick={() => setShowAddCommentForm(true)}>
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewComments;
