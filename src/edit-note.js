const editNote = () => {
  // Hide delete and edit note buttons
  document.querySelector("#delete-note").classList.remove("show-btn");
  document.querySelector("#edit-note").classList.remove("show-btn");

  // Display discard changes and update note buttons
  document.querySelector("#discard-changes").classList.add("show-btn");
  document.querySelector("#update-note").classList.add("show-btn");

  // Grey out note title
  document.querySelector(".note-title-panel").classList.add("grey-text");

  // Make note body panel editable
  document
    .querySelector(".note-body-panel")
    .setAttribute("contenteditable", true);
  document.querySelector(".note-body-panel").classList.add("edit-note");
};
export default editNote;
