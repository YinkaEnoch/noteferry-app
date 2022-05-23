export const clipboardHandler = async (text) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
};
const copyNote = async (props) => {
  try {
    props.setDisable(true); // Disable all buttons
    props.setCopyBtn("Copying Note...");
    await clipboardHandler(props.noteBody); // Copy notes
    props.setFeedback("Copied successfully!!"); // Output success message
    props.setFeedbackType("success");
  } catch (e) {
    props.setFeedback(`Error: ${e}`);
    props.setFeedbackType("danger");
    console.error(e);
  } finally {
    props.setDisable(false); // Unfreeze all buttons
    props.setCopyBtn("Copy");
  }
};

export default copyNote;
