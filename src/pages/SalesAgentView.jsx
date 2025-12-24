import "../App.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";
import SalesAgentContext from "../contexts/SalesAgentContext";

const SalesAgent = () => {
  const { agentId } = useParams();

  const { leads } = useContext(LeadContext);
  const { loading, agents } = useContext(SalesAgentContext);
 
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

 
  const [timeSort, setTimeSort] = useState("");


  const handleStatus = (e) => setStatus(e.target.value);
  const handlePriority = (e) => setPriority(e.target.value);


  const toggleTimeSort = () => {
    setTimeSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };


  const leadStatus = [...new Set(leads.map((l) => l.status))];


  const agent = agents.find((a) => a._id === agentId);

const agentLeads = leads.filter(
  (lead) =>
    Array.isArray(lead.salesAgent) &&
    lead.salesAgent.some((agent) => agent._id === agentId)
);

  const filteredLeads = agentLeads.filter((lead) => { 
    const statusMatch = status ? lead.status === status : true;
    const priorityMatch = priority ? lead.priority === priority : true;
    return statusMatch && priorityMatch;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (timeSort === "asc") return a.timeToClose - b.timeToClose;
    if (timeSort === "desc") return b.timeToClose - a.timeToClose;
    return 0;
  });

  return (
    <div className="page-wrapper bg-salesAgentView">
    <main>
      <div className="pageCenter">
      {loading && <p>Loading...</p>}

      <div className="container">
        <div>
          <h1>Leads by Sales Agent</h1>
        </div>

        <div className="flexTwoboxes">
          <div>
            {/*<h3>Sidebar</h3>*/}
            <Link className="removeLine pages-sidebar" to="/">Back to Dashboard</Link>
          </div>

          <div>
            <h3>Lead List by Agent</h3>
            <h3>Sales Agent: <span style={{color: "green"}}>{agent?.name}</span></h3>

            {sortedLeads.length === 0 ? (
              <p>No leads are there.</p>
            ) : (
              <>
                {sortedLeads.map((lead) => (
                  <div className="lead-row" key={lead._id}>
                  <div className="lead-card lead-name">
                    {lead.name}
                  </div>
                  <div className="lead-card" style={{color: "red"}}> {lead.status}

                  </div>
                  </div>
                ))}
              </>
            )}

            <p><strong>Filters:</strong></p>
            <div className="flexTwoboxes">
              <div>
                <select onChange={handleStatus} value={status}>
                  <option value="">All Status</option>
                  {leadStatus.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <select onChange={handlePriority} value={priority}>
                  <option value="">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <p><strong>Sort by:</strong></p>

       
            <button className="submitButton" onClick={toggleTimeSort}>
              Time to Close{" "}
              {timeSort === "asc" ? "⬆" : timeSort === "desc" ? "⬇" : ""}
            </button>
          </div>
        </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default SalesAgent;