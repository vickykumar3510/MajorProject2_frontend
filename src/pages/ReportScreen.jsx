import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ReportScreen = () => {
  const [pipelineCount, setPipelineCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const res = await fetch("https://major-project2-backend-xi.vercel.app/report/pipeline");
        if (!res.ok) {
          throw new Error("Failed to fetch pipeline report");
        }
        const data = await res.json();
        setPipelineCount(data.totalLeadsInPipeline);
      } catch (err) {
        console.error(err);
        setError("Error loading pipeline report");
      } finally {
        setLoading(false);
      }
    };

    fetchPipeline();
  }, []);

  return (
    <div className="page-wrapper bg-reportScreen">
    <main>
      <div className="pageCenter">
      <div>
        <div>
          <h1>Anvaya CRM Reports</h1>
        </div>
        <div className="flexTwoboxes">
          <div>
            {/*<h3>Sidebar</h3>*/}
            <Link className="removeLine pages-sidebar" to="/">Back to Dashboard</Link>
          </div>
          <div>
            <h3>Report Overview</h3>

            <p>
              <strong>Total Leads closed and in Pipeline: </strong>
              {loading && "Loading..."}
              {error && <span>{error}</span>}
              {!loading && !error && pipelineCount !== null && (
                <span style={{color:"red", fontWeight: "bold"}}>{pipelineCount}</span>
              )}
            </p>

            <p>
              <strong>Leads Closed by Sales Agent: </strong>
            </p>

            <p>
              <strong>Lead Status Distribution: </strong>
            </p>
          </div>
        </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default ReportScreen;
