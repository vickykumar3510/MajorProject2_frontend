import "./App.css"
import { Link } from "react-router-dom"
import { useContext } from "react"
import LeadContext from "./contexts/LeadContext"

function App() {
  const {leads, loading} = useContext(LeadContext)
  //console.log(leads) 

  const newLeads = leads.filter((d) => d.status === "New")
  const contactedLeads = leads.filter((d) => d.status === "Contacted")
  const qualifiedLeads = leads.filter((d) => d.status === "Qualified")

  return (
    <div className="page-wrapper bg-dashboard">
       
    <main>
      <div className="pageCenter">
      {loading && <p>Loading...</p>}
      <div className="container">
       
      <div>
        <h1>Anvaya CRM Dashboard</h1>
      </div>
 
        <div className="flexTwoboxes">
          <div>
            <h3>Sidebar</h3>
            <div className="dashboard-sidebar">
            <Link to="/leadlistscreen" className="removeLine">Leads</Link><br/>
            <Link to="/none" className="removeLine">Sales</Link><br/>
            <Link to="/salesagentmanagementscreen" className="removeLine">Agents</Link><br/>
            <Link to="/reportscreen" className="removeLine">Reports</Link><br/>
            <Link to="" className="removeLine">Settings</Link>
            </div>
          </div>
          <div>
            <h3>Main Content</h3>
            <div> 
              {leads.map((d) => (
                <p className="lead-card lead-name" key={d._id}>{d.name}</p>
              ))}
            </div>
            <div>
              <h3>Lead Status:</h3>
              <p>&#10148;<Link to="/leadstatusview/New" className="removeLine"> New (<span style={{color: "black"}}>{newLeads.length}</span>) Leads</Link></p>
              <p>&#10148;<Link to="/leadstatusview/Qualified" className="removeLine"> Qualifed (<span style={{color: "black"}}>{qualifiedLeads.length}</span>) Leads</Link></p>
              <p>&#10148;<Link to="/leadstatusview/Contacted" className="removeLine"> Contacted (<span style={{color: "black"}}>{contactedLeads.length}</span>) Leads</Link></p>
            </div>
            <div>
              <h3>Quick Filters:</h3>
              <ul className="ulFormatting">
                <li><Link to="/leadstatusview/New" className="removeLine quick-filter">New</Link></li>
                <li><Link to="/leadstatusview/Contacted" className="removeLine quick-filter">Contacted</Link></li>
                <li><Link to="/leadstatusview/Qualified" className="removeLine quick-filter">Qualified</Link></li>
                <li><Link to="/leadstatusview/Proposal Sent" className="removeLine quick-filter">Proposal Sent</Link></li>
                <li><Link to="/leadstatusview/Closed" className="removeLine quick-filter">Closed</Link></li>
              </ul>

              <Link to="/addnewleadscreen">
              <button className="addButton">
              Add New Lead
              </button>
              </Link>
            </div>
          </div>
        </div>
</div>
      </div>
    </main>
    </div>
  )
}

export default App
