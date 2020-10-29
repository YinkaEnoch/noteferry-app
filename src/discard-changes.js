const discardChanges = () => {
  // Display delete and edit note buttons
  document.querySelector("#delete-note").classList.add("show-btn");
  document.querySelector("#edit-note").classList.add("show-btn");

  // Hide discard changes and update note buttons
  document.querySelector("#discard-changes").classList.remove("show-btn");
  document.querySelector("#update-note").classList.remove("show-btn");

  // Blacken note title
  document.querySelector(".note-title-panel").classList.remove("grey-text");

  // Make note body panel uneditable
  document.querySelector(".note-body-panel").removeAttribute("contenteditable");
  document.querySelector(".note-body-panel").classList.remove("edit-note");

  // Discard any note changes
  document.querySelector(".note-body-panel").innerHTML = JSON.parse(
    sessionStorage.noteferry
  ).noteBody;
};

export default discardChanges;
