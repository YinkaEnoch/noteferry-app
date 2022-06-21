const FeedBackPanel = ({ feedback, feedbackType }) => {
  return (
    <p
      className={`feedback-panel ${
        feedbackType === "danger" ? "danger" : "success"
      }`}
    >
      <small>{feedback}</small>
    </p>
  );
};

export default FeedBackPanel;
