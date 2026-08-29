import { Link } from "react-router-dom";
import { Trophy, RotateCcw, Home } from "lucide-react";

const ScoreCard = ({ result, categoryName }) => {
  const passed = result.percentage >= 50;
  // circle circumference for the radial progress (r=54)
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (result.percentage / 100) * circumference;

  return (
    <div className="score-card">
      <div className="score-ring-wrap">
        <svg width="140" height="140" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" className="score-ring-bg" />
          <circle
            cx="60"
            cy="60"
            r="54"
            className={`score-ring-fill ${passed ? "ring-pass" : "ring-fail"}`}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="score-ring-text">
          <span className="score-percent">{result.percentage}%</span>
          <span className={`score-status ${passed ? "text-pass" : "text-fail"}`}>
            {passed ? "PASS" : "FAIL"}
          </span>
        </div>
      </div>

      <h2 className="score-category">
        <Trophy size={20} /> {categoryName}
      </h2>

      <div className="score-stats-grid">
        <div className="stat-box">
          <span className="stat-value">{result.totalQuestions}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-box stat-correct">
          <span className="stat-value">{result.correctAnswers}</span>
          <span className="stat-label">Correct</span>
        </div>
        <div className="stat-box stat-wrong">
          <span className="stat-value">{result.wrongAnswers}</span>
          <span className="stat-label">Wrong</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{result.score}</span>
          <span className="stat-label">Score</span>
        </div>
      </div>

      <div className="score-actions">
        <Link to="/dashboard" className="btn btn-outline">
          <Home size={16} /> Dashboard
        </Link>
        <Link to={`/quiz/${result.categoryId?._id || result.categoryId}`} className="btn btn-primary">
          <RotateCcw size={16} /> Retry Quiz
        </Link>
      </div>
    </div>
  );
};

export default ScoreCard;
