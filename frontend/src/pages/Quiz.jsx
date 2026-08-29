import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

const Quiz = () => {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]); // { questionId, selectedOption }
  const [startTime] = useState(Date.now());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get(`/questions?category=${categoryId}`)
      .then((res) => setQuestions(res.data))
      .catch(() => toast.error("Failed to load quiz questions"))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsSubmitted(true); // lock in the answer immediately, like the spec describes
  };

  const finishQuiz = useCallback(
    async (finalAnswers) => {
      setSubmitting(true);
      try {
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        const res = await api.post("/results", {
          categoryId,
          timeTaken,
          answers: finalAnswers,
        });
        navigate(`/result/${res.data._id}`);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to submit quiz");
        setSubmitting(false);
      }
    },
    [categoryId, navigate, startTime]
  );

  const handleNext = () => {
    const updatedAnswers = [
      ...answers,
      { questionId: currentQuestion._id, selectedOption },
    ];
    setAnswers(updatedAnswers);
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  if (loading) return <div className="page-loader">Loading quiz...</div>;

  if (!loading && questions.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          No questions found for this category yet.
          <button className="btn btn-outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        isSubmitted={isSubmitted}
      />

      <div className="quiz-nav">
        <button
          className="btn btn-primary btn-lg"
          disabled={!isSubmitted || submitting}
          onClick={handleNext}
        >
          {submitting
            ? "Submitting..."
            : currentIndex + 1 === questions.length
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
