import { createContext, useEffect, useState } from "react";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchLeads = async () => {
    try {
      const res = await fetch("https://major-project2-backend-xi.vercel.app/leads");
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error("Error fetching leads", err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchLeads();
  }, []);

  
  const addLead = async (leadData) => {
    const res = await fetch("https://major-project2-backend-xi.vercel.app/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });

    if (!res.ok) {
      throw new Error("Failed to create lead");
    }

    
    await fetchLeads();
  };

  
  const updateLead = async (leadId, updatedData) => {
    try {
      const res = await fetch(`https://major-project2-backend-xi.vercel.app/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Failed to update lead");
      }

     
      await fetchLeads();
    } catch (error) {
      console.error("Update lead error:", error);
      throw error;
    }
  };

  return (
    <LeadContext.Provider value={{ leads, loading, addLead, updateLead, setLeads }}>
      {children}
    </LeadContext.Provider>
  );
};

export default LeadContext;
