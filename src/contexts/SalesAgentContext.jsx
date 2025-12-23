import { createContext, useEffect, useState } from "react";

const SalesAgentContext = createContext();

export const SalesAgentProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("https://major-project2-backend-xi.vercel.app/agents");
        const data = await res.json();
        setAgents(data);
      } catch (err) {
        console.log("error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const addAgent = async (agentData) => {
    const res = await fetch("https://major-project2-backend-xi.vercel.app/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agentData),
    });

    if (!res.ok) {
      throw new Error("Failed to add new agent");
    }

    const response = await res.json();
    const createdAgent = response.agent || response; 

    setAgents((prev) => [...prev, createdAgent]);

    return createdAgent;
  };

  return (
    <SalesAgentContext.Provider value={{ loading, agents, addAgent }}>
      {children}
    </SalesAgentContext.Provider>
  );
};

export default SalesAgentContext;

