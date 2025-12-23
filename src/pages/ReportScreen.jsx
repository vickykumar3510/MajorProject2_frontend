import { Pie, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ReportScreen = () => {
  const [pipelineCount, setPipelineCount] = useState(null);
  const [closedCount, setClosedCount] = useState(null);

  const [agentLabels, setAgentLabels] = useState([]);
  const [agentClosedCounts, setAgentClosedCounts] = useState([]);

  const [statusLabels, setStatusLabels] = useState([]);
  const [statusCounts, setStatusCounts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        
        const overallRes = await fetch("https://major-project2-backend-xi.vercel.app/report/pipeline");
        if (!overallRes.ok) throw new Error("Failed to fetch pipeline report");
        const overallData = await overallRes.json();

        setPipelineCount(overallData.totalLeadsInPipeline ?? 0);
        setClosedCount(overallData.totalLeadsClosed ?? 0);

      
        const agentRes = await fetch(
          "https://major-project2-backend-xi.vercel.app/report/agent-closures"
        );
        if (!agentRes.ok) throw new Error("Failed to fetch agent report");
        const agentData = await agentRes.json();

        setAgentLabels(agentData.labels ?? []);
        setAgentClosedCounts(agentData.counts ?? []);

        
        const statusRes = await fetch(
          "https://major-project2-backend-xi.vercel.app/report/status-distribution"
        );
        if (!statusRes.ok) {
          throw new Error("Failed to fetch status distribution");
        }
        const statusData = await statusRes.json();

        setStatusLabels(statusData.labels ?? []);
        setStatusCounts(statusData.counts ?? []);
      } catch (err) {
        console.error(err);
        setError("Error loading reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  
  const baseFont = {
    size: 14,
    weight: "bold",
  }; 

  
  const closedVsPipelineData = {
    labels: [`Pipeline - ${pipelineCount}`, `Closed - ${closedCount}`],
    datasets: [
      {
        data: [pipelineCount ?? 0, closedCount ?? 0],
        backgroundColor: ["#0d6efd", "#198754"],
      },
    ],
  };


  const leadsByAgentData = {
    labels: agentLabels.map(
      (name, i) => `${name} - ${agentClosedCounts[i] ?? 0}`
    ),
    datasets: [
      {
        label: "Leads Closed",
        data: agentClosedCounts,
        backgroundColor: "#198754",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#000",
          font: baseFont,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#000",
          font: baseFont,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#000",
          font: baseFont,
        },
      },
      tooltip: {
        bodyFont: baseFont,
        titleFont: baseFont,
      },
    },
  }; 

  
  const statusDistributionData = {
    labels: statusLabels.map(
      (status, i) => `${status} - ${statusCounts[i] ?? 0}`
    ),
    datasets: [
      {
        data: statusCounts,
        backgroundColor: ["#0d6efd", "#FFA500", "#198754", "#dc3545", "#0dcaf0"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#000",
          font: baseFont,
        },
      },
      tooltip: {
        bodyFont: baseFont,
        titleFont: baseFont,
      },
    },
  }; 

  return (
    <div className="page-wrapper bg-reportScreen">
      <main>
        <div className="pageCenter">
          <div className="report-container">
            <h1>Anvaya CRM Reports</h1>
            <div className="flexTwoboxes">
              <div>
                <Link className="removeLine pages-sidebar" to="/">
                  Back to Dashboard
                </Link>
              </div>

              <div className="report-content">
                <h3>Report Overview</h3>

                <p className="chart-label"><strong>Total Leads closed and in Pipeline:</strong></p>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                {!loading && !error && (
                  <>
                    <div className="chart-container pie-chart-container">
                      <Pie data={closedVsPipelineData} options={pieOptions} />
                    </div>

                    <p className="chart-label">
                      <strong>Leads Closed by Sales Agent:</strong>
                    </p>

                    <div className="chart-container bar-chart-container">
                      <Bar data={leadsByAgentData} options={barOptions} />
                    </div>

                    <p className="chart-label">
                      <strong>Lead Status Distribution:</strong>
                    </p>

                    <div className="chart-container pie-chart-container">
                      <Pie
                        data={statusDistributionData}
                        options={pieOptions}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportScreen;
