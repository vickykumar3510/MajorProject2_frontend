import "../App.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../contexts/LeadContext";
import SalesAgentContext from "../contexts/SalesAgentContext"
import { toast } from "react-toastify";

const Settings = () => {
    const {leads, setLeads, loading} = useContext(LeadContext)
    const {agents, setAgents} = useContext(SalesAgentContext)

    const handleDeleteLead = async(id) => {
        try {
            const res = await fetch(`https://major-project2-backend-xi.vercel.app/leads/${id}`, {
                method: "DELETE",
            })
            if(res.ok){
                setLeads((prev) => prev.filter((lead) => lead._id !== id))
                toast.success("Lead Deleted successfully.");
            }
        } catch(error){
            console.log("Failed to delete Lead", error)
            toast.error("Failed to delete Lead.");
        }
    }
    
    const handleDeleteAgent = async(id) => {
        try{
            const res = await fetch(`https://major-project2-backend-xi.vercel.app/agents/${id}`, {
                method: "DELETE",
            });
            if(res.ok){
                setAgents((prev) => prev.filter((agent) => agent._id !== id))
                toast.success("Agent Deleted successfully.");
            }
        }catch(error){
            console.log("Failed to delete Agent", error)
            toast.error("Failed to delete Agent.");
        }
    }

    return (
        <div className="page-wrapper bg-SettingsPage">
            <main>
                <div  className="pageCenter">
                    {loading && <p>Loading...</p>}
                    <div className="container">
                        <h1>Delete Leads or Agents</h1>
                        <div className="flexTwoboxes">
                            <div>
                                <Link to="/" className="removeLine pages-sidebar">Back to Dashboard</Link>
                            </div>
                            <div>
                                <h3>All Leads</h3>
                                {leads.map((l) => (
                                    <p className="lead-card lead-name" key={l._id}>{l.name} <button className="deleteBtn" onClick={() => handleDeleteLead(l._id)}>Delete</button></p>
                                ))}
                            </div>
                            <div>
                                <h3>All Agents</h3>
                                {agents.map((a) => (
                                    <p className="lead-card lead-name" style={{color:"green"}} key={a._id}>{a.name} <button className="deleteBtn" onClick={() => handleDeleteAgent(a._id)}>Delete</button></p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Settings