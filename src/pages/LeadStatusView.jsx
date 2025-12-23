import "../App.css";
import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";

const LeadStatusView = () => {
  const { status } = useParams();
  const { leads, loading } = useContext(LeadContext);

  
  const leadAgent = [
    ...new Set(
      leads.map((l) => {
        if (Array.isArray(l.salesAgent)) {
          return l.salesAgent[0]?.name || "Unassigned";
        }
        return l.salesAgent?.name || "Unassigned";
      })
    ),
  ];


  const [agent, setAgent] = useState("");
  const [priority, setPriority] = useState("");

 
  const [sortOrder, setSortOrder] = useState("");

  const handlerAgent = (e) => setAgent(e.target.value);
  const handlePriority = (e) => setPriority(e.target.value);
  const handleSort = (e) => setSortOrder(e.target.value);

  
  const filteredLeads = leads.filter((lead) => {
    const statusMatch = lead.status === status;

    const leadAgentName = Array.isArray(lead.salesAgent)
      ? lead.salesAgent[0]?.name
      : lead.salesAgent?.name;

    const agentMatch = agent ? leadAgentName === agent : true;
    const priorityMatch = priority ? lead.priority === priority : true;

    return statusMatch && agentMatch && priorityMatch;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.timeToClose - b.timeToClose;
    }
    if (sortOrder === "desc") {
      return b.timeToClose - a.timeToClose;
    }
    return 0;
  });

  return (
    <div className="page-wrapper bg-leadByStatus">
    <main>
      <div className="pageCenter">
      {loading && <p>Loading...</p>}

      <div className="container">
        <h1>Leads by Status</h1>

        <div className="flexTwoboxes">
          
          <aside>
            {/*<h3>Sidebar</h3>*/}
            <Link className="removeLine pages-sidebar" to="/">Back to Dashboard</Link>
          </aside>

        
          <section>
            <h3>Lead List by Status</h3>
            <h4>Status: <span>{status}</span></h4>

  
            {sortedLeads.length === 0 ? (
              <p>No leads match the selected filters.</p>
            ) : (
              sortedLeads.map((l) => (
                <p key={l._id}>
                  <span>{l.name}</span> - <span style={{color:"gray"}}>Sales Agent:</span>{" "}
                  
                  {Array.isArray(l.salesAgent)
                    ? l.salesAgent[0]?.name
                    : l.salesAgent?.name}
                    <hr />
                </p>
                
              ))
            )}

      
            <p><strong>Filters:</strong></p>
            <div className="flexTwoboxes">
              <select value={agent} onChange={handlerAgent}>
                <option value="">All Agents</option>
                {leadAgent.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>

              <select value={priority} onChange={handlePriority}>
                <option value="">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

  
            <p><strong>Sort by:</strong></p>
            <select value={sortOrder} onChange={handleSort}>
              <option value="">Default</option>
              <option value="asc">Time to Close (Low → High)</option>
              <option value="desc">Time to Close (High → Low)</option>
            </select>
          </section>
        </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default LeadStatusView;
