import "../App.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SalesAgentContext from "../contexts/SalesAgentContext";

const AddNewSalesAgent = () => {
  const { addAgent } = useContext(SalesAgentContext);

  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newAgent.name || !newAgent.email) {
      alert("Please fill in both name and email.");
      return;
    }

    try {
      await addAgent(newAgent);

      alert("New Agent added.");

      setNewAgent({
        name: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error creating new agent.");
    }
  };

  return (
    <div className="page-wrapper bg-addPage">
    <main>
      <div className="pageCenter">
      <div className="container">
        <h1>Add New Sales Agent</h1>
        <div className="flexTwoboxes">
          <div>
            {/*<h3>Sidebar</h3>*/}
            <Link to="/" className="removeLine pages-sidebar">Back to Dashboard</Link>
          </div>
          <div>
            {/*earlier h1 was here*/}
            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Agent Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newAgent.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email address:</label>
                <input
                  type="email"
                  name="email"
                  value={newAgent.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="addButton">Create Agent</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default AddNewSalesAgent;
