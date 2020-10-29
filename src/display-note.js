import copyNote from "./copy-note.js";
import deleteNote from "./delete-note.js";
import discardChanges from "./discard-changes.js";
import editNote from "./edit-note.js";
import updateNote from "./update-note.js";

const displayNote = (resp) => {
  // Add active-form class to display-note-body
  document.querySelector(".active-form").classList.remove("active-form");
  document.querySelector("#display-note-body").classList.add("active-form");
  // Remove active-btn from current element
  document.querySelector(".active-btn").classList.remove("active-btn");

  // Append response to DOM
  document.querySelector(".note-title-panel").textContent = resp.data.noteTitle;
  document.querySelector(".note-body-panel").textContent = resp.data.noteBody;

  // Save response to storage
  sessionStorage.noteferry = JSON.stringify(resp.data);

  // Copy Button Handler
  document
    .querySelector("#copy-note")
    .addEventListener("click", (e) => copyNote(e));

  // Delete Button Handler
  document
    .querySelector("#delete-note")
    .addEventListener("click", (e) => deleteNote(e));

  // Discard Changes Handler
  if (document.querySelector("#discard-changes"))
    document
      .querySelector("#discard-changes")
      .addEventListener("click", (e) => discardChanges(e));

  // Edit Button Handler
  document
    .querySelector("#edit-note")
    .addEventListener("click", (e) => editNote(e));

  // Update Button Handler
  if (document.querySelector("#update-note"))
    document
      .querySelector("#update-note")
      .addEventListener("click", (e) => updateNote(e));
};

export default displayNote;
