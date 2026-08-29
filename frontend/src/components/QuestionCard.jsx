import AnswerOption from "./AnswerOption";

const LABELS = ["A", "B", "C", "D"];

const QuestionCard = ({ question, selectedOption, onSelect, isSubmitted }) => {
  const getState = (option) => {
    if (!isSubmitted) return "idle";
    if (option === question.correctAnswer) return "reveal-correct";
    if (option === selectedOption && option !== question.correctAnswer) return "wrong";
    return "disabled";
  };

  return (
    <div className="question-card">
      <h2 className="question-text">{question.question}</h2>
      <div className="answer-grid">
        {question.options.map((opt, idx) => (
          <AnswerOption
            key={idx}
            label={LABELS[idx]}
            text={opt}
            state={getState(opt)}
            onClick={() => !isSubmitted && onSelect(opt)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
