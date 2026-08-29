import { useEffect, useState } from "react";
import api from "../services/api";
import QuizCard from "../components/QuizCard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Welcome, {user?.name} 👋</h1>
      <p className="page-subtitle">Choose a category below to start a quiz</p>

      {loading && <div className="page-loader">Loading categories...</div>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && categories.length === 0 && (
        <div className="empty-state">
          No quiz categories available yet. Please check back later or ask an admin to add some.
        </div>
      )}

      <div className="quiz-grid">
        {categories.map((cat) => (
          <QuizCard key={cat._id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
