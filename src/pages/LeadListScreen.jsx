import "../App.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";

const LeadListScreen = () => {
  const { leads, loading } = useContext(LeadContext);
 

  const leadStatus = [...new Set(leads.map((l) => l.status))];
  const leadAgent = [
    ...new Set(
      leads.map((d) => {
        if (Array.isArray(d.salesAgent))
          return d.salesAgent[0]?.name || "Unassigned";
        return d.salesAgent?.name || "Unassigned";
      })
    ),
  ];
  const leadTags = [
    ...new Set(
      leads
        .flatMap((l) => l.tags || [])
        .map((tag) => tag.trim())
        .filter(Boolean)
    ),
  ];
  const leadSource = [...new Set(leads.map((le) => le.source))];

 
  const [status, setStatus] = useState("");
  const [agent, setAgent] = useState("");
  const [tags, setTags] = useState("");
  const [source, setSource] = useState("");

 
  const [prioritySort, setPrioritySort] = useState("");
  const [timeSort, setTimeSort] = useState("");

  const handlerStatus = (e) => setStatus(e.target.value);
  const handlerAgent = (e) => setAgent(e.target.value);
  const handlerTags = (e) => setTags(e.target.value);
  const handlerSource = (e) => setSource(e.target.value);


  const togglePrioritySort = () => {
    setPrioritySort((prev) => (prev === "asc" ? "desc" : "asc"));
    setTimeSort("");
  };

  const toggleTimeSort = () => {
    setTimeSort((prev) => (prev === "asc" ? "desc" : "asc"));
    setPrioritySort("");
  };

  
  const filteredLeads = leads.filter((lead) => {
    const agentName = Array.isArray(lead.salesAgent)
      ? lead.salesAgent[0]?.name
      : lead.salesAgent?.name;

    return (
      (!status || lead.status === status) &&
      (!agent || agentName === agent) &&
      (!tags || lead.tags?.includes(tags)) &&
      (!source || lead.source === source)
    );
  });

 
  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (prioritySort) {
      return prioritySort === "asc"
        ? priorityOrder[b.priority] - priorityOrder[a.priority]
        : priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (timeSort) {
      return timeSort === "asc"
        ? a.timeToClose - b.timeToClose
        : b.timeToClose - a.timeToClose;
    }

    return 0;
  });

  return (
    <div className="page-wrapper bg-leadList">
    <main>
      <div className="pageCenter">
      {loading && <p>Loading...</p>}

      <div className="container">
        <div>
          <h1>Lead List</h1>
        </div>

        <div className="flexTwoboxes">
          <div>
            {/*<h3>Sidebar</h3>*/}
            <Link className="removeLine pages-sidebar" to="/">Back to Dashboard</Link>
          </div>

          <div>
            <h3>Lead Overview</h3>

            {sortedLeads.map((d) => {
              const agentName = Array.isArray(d.salesAgent)
                ? d.salesAgent[0]?.name || "Unassigned"
                : d.salesAgent?.name || "Unassigned";

              return (
                <div className="lead-row" key={d._id}>
                <div className="lead-card">
                  <Link className="removeLine lead-name-listScreen" to={`/leadmanagementscreen/${d._id}`}>
                    {d.name}
                  </Link>
                </div>
                  <div className="lead-card" style={{color: "red"}}>
                  {d.status}
                  </div>
                    <div className="lead-card" style={{color: "green"}}>
                       {agentName}
                </div>
                </div>
              )
            })}

            <section>
              <h3 className="alignFilter">Filters:</h3>
              <div className="flexTwoboxes">
                <div>
                  <p>Status:</p>
                  <select className="selectDiv" value={status} onChange={handlerStatus}>
                    <option value="">All</option>
                    {leadStatus.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Sales Agent:</p>
                  <select className="selectDiv" value={agent} onChange={handlerAgent}>
                    <option value="">All</option>
                    {leadAgent.map((de) => (
                      <option key={de} value={de}>
                        {de}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Tags:</p>
                  <select className="selectDiv" value={tags} onChange={handlerTags}>
                    <option value="">All</option>
                    {leadTags.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Lead Source:</p>
                  <select className="selectDiv" value={source} onChange={handlerSource}>
                    <option value="">All</option>
                    {leadSource.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <h3>Sort by:</h3>
              <div className="flexTwoboxes">
              <div>
              <button className="smallButton" onClick={togglePrioritySort}>
                Priority{" "}
                {prioritySort === "asc"
                  ? "⬆"
                  : prioritySort === "desc"
                  ? "⬇"
                  : ""}
              </button> {" "}
              </div>


              <div>
              <button className="smallButton" onClick={toggleTimeSort}>
                Time to Close{" "}
                {timeSort === "asc"
                  ? "⬆"
                  : timeSort === "desc"
                  ? "⬇"
                  : ""}
              </button>
              <br/><br/>
              </div>
              </div>

              <Link to="/addnewleadscreen">
                <button className="addButton">Add New Lead</button>
              </Link>
            </section>
          </div>
        </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default LeadListScreen;