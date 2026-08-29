import { useEffect, useState } from "react";
import api from "../services/api";

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/results")
      .then((res) => setResults(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader">Loading results...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">All Quiz Results</h1>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Quiz</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r._id}>
                <td>
                  {r.userId?.name} <br />
                  <small>{r.userId?.email}</small>
                </td>
                <td>{r.categoryId?.name}</td>
                <td>
                  {r.correctAnswers}/{r.totalQuestions}
                </td>
                <td>
                  <span className={`badge ${r.percentage >= 50 ? "badge-active" : "badge-blocked"}`}>
                    {r.percentage}%
                  </span>
                </td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminResults;
