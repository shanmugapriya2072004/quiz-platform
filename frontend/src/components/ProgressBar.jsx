const ProgressBar = ({ current, total }) => {
  const percent = total ? Math.round((current / total) * 100) : 0;
  return (
    <div className="progress-wrap">
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-label">
        Question {current} of {total}
      </span>
    </div>
  );
};

export default ProgressBar;
