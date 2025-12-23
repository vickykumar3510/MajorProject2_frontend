import "../App.css"
import { Link } from "react-router-dom"
import { useContext } from "react"
import SalesAgentContext from "../contexts/SalesAgentContext"

const SalesAgentManagementScreen = () => {
    const {loading, agents} = useContext(SalesAgentContext)
    console.log(agents)
    return(
        <div className="page-wrapper bg-salesAgentManagement">
        <main>
            <div className="pageCenter">
            <div className="container">
                <div>
                    <h1>Sales Agent Management</h1>
                </div>
                <div className="flexTwoboxes">
                    <div>
                        {/*<h3>Sidebar</h3>*/}
                        <Link className="removeLine pages-sidebar" to="/">Back to Dashboard</Link>
                    </div>
                    <div>
                        <h3>Sales Agent List</h3>
                        {agents.map((d) => (
                            <div className="agent-row">
                            <div className="agent-card" key={d._id}><Link className="removeLine agent-name" to={`/salesagentview/${d._id}`}>{d.name}</Link></div>
                            <div className="agent-card"> {d.email}</div>
                            </div>
                        ))}
                        <Link to="/addnewsalesagent"><button className="addButton">Add new Agent</button></Link>
                    </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    )
}

export default SalesAgentManagementScreen
