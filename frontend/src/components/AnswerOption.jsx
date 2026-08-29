import { Check, X } from "lucide-react";

// state: 'idle' | 'correct' | 'wrong' | 'reveal-correct' | 'disabled'
const AnswerOption = ({ label, text, state, onClick }) => {
  let className = "answer-option";
  if (state === "correct") className += " answer-correct";
  else if (state === "wrong") className += " answer-wrong";
  else if (state === "reveal-correct") className += " answer-correct";
  else if (state === "disabled") className += " answer-disabled";

  return (
    <button className={className} onClick={onClick} disabled={state !== "idle"}>
      <span className="answer-label">{label}</span>
      <span className="answer-text">{text}</span>
      {state === "correct" && <Check size={20} className="answer-icon" />}
      {state === "wrong" && <X size={20} className="answer-icon" />}
      {state === "reveal-correct" && <Check size={20} className="answer-icon" />}
    </button>
  );
};

export default AnswerOption;
