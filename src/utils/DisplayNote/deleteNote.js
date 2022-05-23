const deleteNote = async (props) => {
  const url = process.env.NEXT_PUBLIC_NOTES_SERVER_URL + "/" + props.noteTitle;
  // freeze all buttons
  props.setDisable(true);
  // change button to deleting
  props.setDeleteBtn("Deleting Note...");
  // Delete note
  const resp = await (await fetch(url, { method: "DELETE" })).json();

  // Unfreeze buttons
  props.setDisable(false);
  props.setDeleteBtn("Delete");
  props.setShowDelModal(false);

  // if deletion failed show error message
  if (resp.code == 1) {
    props.setFeedbackType("danger");
    props.setFeedback(`Failed to delete note!! ${resp.message}`);
  } else {
    // if response is okay show modal deleted
    props.setShowDelModal(true);
    // Re-route to create note
    setTimeout(() => {
      props.router.push("/note/create");
    }, 2000);
  }
};

export default deleteNote;
