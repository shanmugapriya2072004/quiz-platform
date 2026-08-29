import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Percent } from "lucide-react";
import api from "../services/api";

const History = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/results/my")
      .then((res) => setResults(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader">Loading history...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Quiz History</h1>
      {results.length === 0 ? (
        <div className="empty-state">
          You haven't taken any quizzes yet. <Link to="/dashboard">Take one now</Link>.
        </div>
      ) : (
        <div className="history-list">
          {results.map((r) => (
            <Link to={`/result/${r._id}`} key={r._id} className="history-item">
              <div>
                <h3>{r.categoryId?.name || "Quiz"}</h3>
                <span className="history-date">
                  <Calendar size={14} /> {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className={`history-badge ${r.percentage >= 50 ? "badge-pass" : "badge-fail"}`}>
                <Percent size={14} /> {r.percentage}%
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
