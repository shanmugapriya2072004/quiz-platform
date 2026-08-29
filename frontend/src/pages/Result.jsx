import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ScoreCard from "../components/ScoreCard";
import { Check, X } from "lucide-react";

const Result = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/results/${id}`)
      .then((res) => setResult(res.data))
      .catch(() => setError("Failed to load result"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-loader">Calculating your score...</div>;
  if (error) return <div className="error-banner">{error}</div>;
  if (!result) return null;

  return (
    <div className="page-container">
      <ScoreCard result={result} categoryName={result.categoryId?.name || "Quiz"} />

      <div className="review-section">
        <h3>Question-wise Review</h3>
        <ul className="review-list">
          {result.answers.map((a, idx) => (
            <li key={idx} className={`review-item ${a.isCorrect ? "review-correct" : "review-wrong"}`}>
              {a.isCorrect ? <Check size={18} /> : <X size={18} />}
              <div>
                <p className="review-selected">Your answer: {a.selectedOption || "Skipped"}</p>
                {!a.isCorrect && <p className="review-correct-text">Correct answer: {a.correctOption}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
