import { freezeBtns, addMessagePanel, cleanUp } from "./display-utils.js";
import { API_URL } from "./config.js";
import { spinner } from "./components.js";

const updateNote = (e) => {
  freezeBtns();
  e.target.textContent = "";
  e.target.classList.add("btn-spinner");
  e.target.appendChild(spinner("white"));

  // Fetch note title from storage
  let noteTitle = JSON.parse(sessionStorage.noteferry).noteTitle;
  let noteBody = JSON.parse(sessionStorage.noteferry).noteBody;

  // Get the changes
  let newNoteBody = document.querySelector(".note-body-panel").innerHTML;

  // NO CHANGES
  if (noteBody === newNoteBody) {
    addMessagePanel({
      colorType: "danger",
      content: "Failed to save note. There are no changes"
    });
    setTimeout(() => {
      cleanUp(e, "Update Note");
    }, 2000);
    return false;
  }

  fetch(API_URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      noteBody: newNoteBody,
      noteTitle
    })
  })
    .then((resp) => resp.json())
    .then((resp) => {
      // ERROR
      if (resp.statusCode == 0) {
        addMessagePanel({ colorType: "danger", content: resp.message });
        // Clean Up
        setTimeout(() => {
          cleanUp(e, "Update Note");
        }, 2000);
        return false;
      }

      // Save new changes to storage
      sessionStorage.noteferry = JSON.stringify(resp.data);
      // Pop notice
      addMessagePanel({ colorType: "success", content: resp.message });

      // Click discard changes button
      document.querySelector("#discard-changes").click();

      // Clean Up
      setTimeout(() => {
        cleanUp(e, "Update Note");
      }, 2000);
    })
    .catch((err) => {
      addMessagePanel({ colorType: "danger", content: err.message });
      // Clean Up
      setTimeout(() => {
        cleanUp(e, "Update Note");
      }, 2000);
    });
};

export default updateNote;
