const DeleteItem = async (props) => {
  const { itemType } = props;

  let url =
    itemType === "note"
      ? process.env.NEXT_PUBLIC_NOTES_SERVER_URL
      : process.env.NEXT_PUBLIC_DOCS_SERVER_URL;
  url += `/${props.title}`;

  // freeze all buttons
  props.setDisable(true);
  // change button to deleting
  props.setDeleteBtn(`Deleting ${itemType}...`);
  // Delete note
  const resp = await (await fetch(url, { method: "DELETE" })).json();
  console.log(resp);

  // Unfreeze buttons
  props.setDisable(false);
  props.setDeleteBtn("Delete");

  // if deletion failed show error message
  if (resp.code == 1) {
    props.setFeedbackType("danger");
    props.setFeedback(`Failed to delete ${itemType}!! ${resp.message}`);
  } else {
    // if response is okay show modal deleted
    props.setShowDelModal(true);
    // Re-route to create note / doc
    const reroute = itemType === "note" ? "/note/create" : "/doc/stash";

    setTimeout(() => {
      props.setShowDelModal(false);
      props.router.push(reroute);
    }, 2000);
  }
};

export default DeleteItem;
