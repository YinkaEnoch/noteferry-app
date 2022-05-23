const deleteNote = async (props) => {
  // freeze all buttons
  props.setDisable(true);
  // Delete note
  const resp = await (await fetch(url, { method: "DELETE" })).json();
  // change button to deleting
  props.setDeleteBtn("Deleting Note...");

  // if deletion failed show error message
  if (resp.code == 1) {
    props.setMsgType("danger");
    props.setActionMsg(`Failed to delete note!! ${resp.message}`);
  } else {
    // if response is okay show modal deleted
    props.showDeleteModal(true);
    // Re-route to create note
    props.router.push("/note/create");
  }
  props.setDisable(false);
  props.setDeleteBtn("Delete");
  props.showDeleteModal(false);
};

export default deleteNote;
