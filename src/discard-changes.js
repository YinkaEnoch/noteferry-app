function discardChanges() {
  // Display copy, delete and edit note buttons
  document.querySelector("#copy-note").classList.add("show-btn");
  document.querySelector("#delete-note").classList.add("show-btn");
  document.querySelector("#edit-note").classList.add("show-btn");

  // Hide discard changes and update note buttons
  document.querySelector("#discard-changes").classList.remove("show-btn");
  document.querySelector("#update-note").classList.remove("show-btn");

  // Blacken note title
  document.querySelector(".note-title-panel").classList.remove("text-grey");

  // Make note body panel uneditable
  document.querySelector(".note-body-panel").removeAttribute("contenteditable");
  document.querySelector(".note-body-panel").classList.remove("edit-note");

  // Discard any note changes
  document.querySelector(".note-body-panel").textContent = JSON.parse(
    sessionStorage.noteferry
  ).noteBody;
}

document
  .querySelector("#discard-changes")
  .addEventListener("click", discardChanges);

export default discardChanges;
