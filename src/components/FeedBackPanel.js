const FeedBackPanel = ({ feedback, feedbackType, textAlign }) => {
  const styles = textAlign === "left" ? { textAlign: "left" } : {};

  return (
    <p
      style={styles}
      className={`feedback-panel ${
        feedbackType === "danger" ? "danger" : "success"
      }`}
    >
      <small>{feedback}</small>
    </p>
  );
};

export default FeedBackPanel;
