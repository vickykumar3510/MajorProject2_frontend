import "../App.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";
import SalesAgentContext from "../contexts/SalesAgentContext";
import CommentContext from "../contexts/CommentsContext";

const LeadManagementScreen = () => {
  const { leadId } = useParams();

  const { leads, loading, updateLead } = useContext(LeadContext);
  const { agents } = useContext(SalesAgentContext);
  
  const {
    comments,
    addComment,
    getCommentsByAgent,
    loading: commentsLoading,
  } = useContext(CommentContext);

  const lead = leads.find((l) => l._id === leadId);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

 
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [filterAgent, setFilterAgent] = useState("");

  if (loading) return <p>Loading...</p>;

  if (loading || !leads.length) {
  return <p>Loading lead...</p>;
}

if (!lead) {
  return <p>Lead not found</p>;
}


  const handleEditClick = () => {
    setFormData({
      name: lead.name,
      source: lead.source,
      status: lead.status,
      priority: lead.priority,
      tags: lead.tags || [],
      timeToClose: lead.timeToClose,
      salesAgent: lead.salesAgent?.[0]?._id || "",
    });
    setIsEditing(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, tags: selectedTags }));
  };

 
  const handleUpdate = async () => {
    try {
      if (!formData.timeToClose || Number(formData.timeToClose) < 1) {
        alert("Time to Close must be at least 1");
        return;
      }

      const updatedData = {
        name: formData.name,
        source: formData.source,
        status: formData.status,
        priority: formData.priority,
        timeToClose: Number(formData.timeToClose),
        salesAgent: formData.salesAgent,
        tags: formData.tags,
      };

      await updateLead(leadId, updatedData);

      setIsEditing(false);
      alert("Lead updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update lead");
    }
  };


  const handleAddComment = () => {
    if (!newComment || !commentAuthor) {
      alert("Please enter comment and select author");
      return;
    }

    addComment(newComment, commentAuthor);
    setNewComment("");
  };

 
  const displayedComments = filterAgent
  ? comments.filter(c => c.author === agents.find(a => a._id === filterAgent)?.name)
  : comments;


  return (
    <div className="page-wrapper bg-leadManagement">
    <main>
      <div className="pageCenter">
      
      <div className="container">
        <h1>Lead Management: <span>{lead.name}</span></h1>

        <div className="flexTwoboxes">
         
          <div>
            {/*<h3>Sidebar</h3>*/}
            <Link className="removeLine pages-sidebar" to="/">Back to Dashboard</Link>
          </div>
          <div>
            <h3>Lead Details</h3>

            {!isEditing ? (
              <>
                <p><strong>Name:</strong> {lead.name}</p>
                <p><strong>Agent:</strong> {lead.salesAgent?.[0]?.name || "Unassigned"}</p>
                <p><strong>Source:</strong> {lead.source}</p>
                <p><strong>Status:</strong> {lead.status}</p>
                <p><strong>Priority:</strong> {lead.priority}</p>
                <p><strong>Time to Close:</strong> {lead.timeToClose}</p>
                <p><strong>Tags:</strong> {lead.tags?.join(", ")}</p>

                <button className="smallButton" onClick={handleEditClick}>Edit Lead</button>
              </>
            ) : (
              <>
                <input name="name" value={formData.name} onChange={handleChange} /> {" "}

                <select name="salesAgent" value={formData.salesAgent} onChange={handleChange}>
                  <option value="">Select Agent</option>
                  {agents.map((a) => (
                    <option key={a._id} value={a._id}>{a.name}</option>
                  ))}
                </select>{" "}

                <select name="source" value={formData.source} onChange={handleChange}>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                </select> {" "}

                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Closed">Closed</option>
                  <option value="Proposal Sent">Proposal Sent</option> 
                </select> {" "}

                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>{" "}

                <select multiple value={formData.tags} onChange={handleTagsChange}>
                  <option value="Important">Important</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Long-term">Long-term</option>
                </select> {" "}

                <input
                  type="number"
                  name="timeToClose"
                  min="1"
                  value={formData.timeToClose}
                  onChange={handleChange}
                /> {" "}

                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            )}

           
            <hr />
            <h3>Comments</h3>
            <p>Filter comments by Sales Agents:-</p>

            <select className="selectDiv" value={filterAgent} onChange={(e) => setFilterAgent(e.target.value)}>
              <option value="">All Authors</option>
              {agents.map((a) => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>

            <br /><br />

            <select className="selectDiv" value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)}>
              <option value="">Select Author</option>
              {agents.map((a) => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select> {" "}

            <input className="selectDiv"
              type="text"
              placeholder="Add comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <button className="submitButton" onClick={handleAddComment}>Submit</button>

            <div>
              {commentsLoading && <p>Loading comments...</p>}
              {!commentsLoading && displayedComments.length === 0 && (
                <p style={{color: "maroon"}}>No comments yet</p>
              )}

              {displayedComments.map((c) => {
  const authorName = c.author; 
  const formattedTime = new Date(c.createdAt).toLocaleString();
  return (
    <div key={c.id}>
      <p>
        {c.commentText} — {authorName} <span style={{ color: "gray", fontSize: "0.9em" }}>({formattedTime})</span>
      </p>
    </div>
  );
})}
            </div>

          </div>
        </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default LeadManagementScreen;