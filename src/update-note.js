import { freezeBtns, addMessagePanel, cleanUp } from "./display-utils.js";
import { API_URL } from "./config.js";
import discardChanges from "./discard-changes.js";
import { parseDate } from "./utils.js";

document.querySelector("#update-note").addEventListener("click", (e) => {
  freezeBtns();
  e.target.textContent = "Updating note...";

  // Fetch note title from storage
  let noteTitle = JSON.parse(sessionStorage.noteferry).noteTitle;
  let noteBody = JSON.parse(sessionStorage.noteferry).noteBody;

  // Get the changes
  let newNoteBody = document
    .querySelector(".note-body-panel")
    .textContent.trim();

  // NO CHANGES
  if (noteBody === newNoteBody) {
    addMessagePanel({
      colorType: "danger",
      content: "Failed to save note. There are no changes",
    });

    setTimeout(() => {
      cleanUp(e, "Update Note");
    }, 1000);

    // Make note-body-panel contenteditable
    // For an unknown bug the contenteditable attribute is always
    // removed after returning the error message
    document
      .querySelector(".note-body-panel")
      .setAttribute("contenteditable", true);
    return false;
  }

  fetch(API_URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      noteBody: newNoteBody.trim(),
      noteTitle,
    }),
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
      // Update last modified time
      document.querySelector("#last-modified").textContent = parseDate(
        resp.data.updatedAt
      );
      // Pop notice
      addMessagePanel({ colorType: "success", content: resp.message });

      // Discard changes
      discardChanges();

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
});
