import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CommentContext = createContext();

export const CommentProvider = ({ children, leadId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchComments = async () => {
    if (!leadId) return;
    setLoading(true);
    try {
      const res = await fetch(`https://major-project2-backend-xi.vercel.app/leads/${leadId}/comments`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : data.comments || []);
    } catch (err) {
      console.error("Fetch comments error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const addComment = async (commentText, author) => {
    if (!leadId) return;
    toast.success("Comment added")

    try {
      const res = await fetch(
        `https://major-project2-backend-xi.vercel.app/leads/${leadId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commentText, author }),
        }
      );

      if (!res.ok) throw new Error("Failed to add comment");

      const response = await res.json();
      const newComment = response.comment || response;

      
      setComments((prev) => [newComment, ...prev]);

    
      await fetchComments();
    } catch (err) {
      console.error("Add comment error:", err);
      setError(err.message);
    }
  };

  
  const getCommentsByAgent = (agentId) => {
    return comments.filter((c) => c.author === agentId);
  };

  useEffect(() => {
    fetchComments();
  }, [leadId]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        error,
        addComment,
        getCommentsByAgent,
        fetchComments,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
