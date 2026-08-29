import { Link } from "react-router-dom";
import { Layers, ArrowRight } from "lucide-react";

const QuizCard = ({ category }) => (
  <div className="quiz-card">
    <div className="quiz-card-icon">
      <Layers size={28} />
    </div>
    <div style={{fontSize:"0.72rem",fontWeight:700,color:"var(--primary)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.35rem"}}>Quick Challenge</div>
    <h3>{category.name}</h3>
    <p>{category.description || "Test your knowledge in this category."}</p>
    <Link to={`/quiz/${category._id}`} className="btn btn-primary btn-block">
      Start Quiz <ArrowRight size={16} />
    </Link>
  </div>
);

export default QuizCard;
