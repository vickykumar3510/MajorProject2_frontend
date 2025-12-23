import "../App.css";
import { useContext, useState } from "react";
import SalesAgentContext from "../contexts/SalesAgentContext";
import LeadContext from "../contexts/LeadContext";
import { Link } from "react-router-dom";

const AddNewLeadScreen = () => {
  const { agents, loading } = useContext(SalesAgentContext);
  const { addLead } = useContext(LeadContext);

  const [newLead, setNewLead] = useState({
    name: "",
    source: "",
    salesAgent: [], 
    status: "",
    priority: "",
    timeToClose: "",
    tags: [],
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleMultiSelect = (e) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions, (opt) => opt.value);
    setNewLead((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (
      !newLead.name ||
      !newLead.source ||
      newLead.salesAgent.length === 0 ||
      !newLead.status ||
      !newLead.priority ||
      !newLead.tags.length ||
      !newLead.timeToClose
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await addLead({
        ...newLead,
        timeToClose: Number(newLead.timeToClose),
      });

      alert("Lead created successfully.");

      
      setNewLead({
        name: "",
        source: "",
        salesAgent: [],
        status: "",
        priority: "",
        timeToClose: "",
        tags: [],
      });
    } catch (error) {
      console.log(error);
      alert("Error creating lead.");
    }
  };

  return (
    <div className="page-wrapper bg-addPage">
    <main>
      <div className="pageCenter">
      {loading && <p>Loading...</p>}

      <div className="container">
        <h1>Add New Lead</h1>
        <div className="flexTwoboxes">
          <div>
            {/*<h3>Sidebar</h3>*/}
            <Link to="/" className="removeLine pages-sidebar">Back to Dashboard</Link>
          </div>
          <div>
            {/*earlier h1 was here*/}
            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>Lead Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newLead.name}
                  onChange={handleChange}
                />
              </div>

             
              <div className="form-row">
                <label>Lead Source:</label>
                <select
                  name="source"
                  value={newLead.source}
                  onChange={handleChange}
                >
                  <option value="">Select Source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
              </div>

             
              <div className="form-row">
                <label>Sales Agent:</label>
                <select
                  name="salesAgent"
                  multiple
                  value={newLead.salesAgent}
                  onChange={handleMultiSelect}
                >
                  {!loading &&
                    agents.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                </select>
              </div>

              
              <div className="form-row">
                <label>Lead Status:</label>
                <select
                  name="status"
                  value={newLead.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

          
              <div className="form-row">
                <label>Priority:</label>
                <select
                  name="priority"
                  value={newLead.priority}
                  onChange={handleChange}
                >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
              </div>

         
              <div className="form-row">
                <label>Time to Close (days):</label>
                <input
                  type="number"
                  name="timeToClose"
                  value={newLead.timeToClose}
                  onChange={handleChange}
                  placeholder="number of days"
                />
              </div>

           
              <div className="form-row">
                <label>Tags:</label>
                <select
                  name="tags"
                  multiple
                  value={newLead.tags}
                  onChange={handleMultiSelect}
                >
                  <option value="High Value">High Value</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Potential Deal">Potential Deal</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                </select>
              </div>

              <button type="submit" className="addButton">Create Lead</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default AddNewLeadScreen;
