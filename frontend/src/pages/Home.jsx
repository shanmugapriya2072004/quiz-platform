import { Link } from "react-router-dom";
import { BrainCircuit, CheckCircle2, BarChart3, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="home-hero">
      <div className="home-hero-content">
        <BrainCircuit size={56} className="home-hero-icon" />
        <h1>Test Your Knowledge with QuizPlatform</h1>
        <p>
          Pick a category, answer multiple-choice questions, get instant green/red feedback,
          and track your progress with detailed score cards.
        </p>
        <div className="home-hero-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                I already have an account
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <CheckCircle2 size={28} />
          <h3>Instant Feedback</h3>
          <p>See correct and wrong answers highlighted immediately as you answer.</p>
        </div>
        <div className="feature-card">
          <BarChart3 size={28} />
          <h3>Score Tracking</h3>
          <p>Review your quiz history and performance summary anytime.</p>
        </div>
        <div className="feature-card">
          <ShieldCheck size={28} />
          <h3>Secure & Simple</h3>
          <p>JWT-based authentication keeps your account and progress safe.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
