import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, HelpCircle, ListChecks, TrendingUp } from "lucide-react";
import api from "../services/api";

const Admin = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  const cards = [
    { label: "Total Users", value: stats?.totalUsers ?? "-", icon: Users },
    { label: "Total Questions", value: stats?.totalQuestions ?? "-", icon: HelpCircle },
    { label: "Total Quizzes Taken", value: stats?.totalQuizzes ?? "-", icon: ListChecks },
    { label: "Average Score", value: stats ? `${stats.averageScore}%` : "-", icon: TrendingUp },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="stats-grid">
        {cards.map((c) => (
          <div className="stat-card" key={c.label}>
            <c.icon size={26} />
            <div>
              <span className="stat-card-value">{c.value}</span>
              <span className="stat-card-label">{c.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-links">
        <Link to="/admin/questions" className="admin-link-card">
          <HelpCircle size={22} />
          <div>
            <h3>Manage Questions</h3>
            <p>Add, edit and delete quiz questions and categories</p>
          </div>
        </Link>
        <Link to="/admin/users" className="admin-link-card">
          <Users size={22} />
          <div>
            <h3>Manage Users</h3>
            <p>View users and toggle account status</p>
          </div>
        </Link>
        <Link to="/admin/results" className="admin-link-card">
          <ListChecks size={22} />
          <div>
            <h3>All Results</h3>
            <p>See every quiz attempt across all users</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
