import { spinner, messagePanel } from "./components";
import { API_URL } from "./config.js";

// Create Note Form Handler
const createNote = (e) => {
  // prevent default
  e.preventDefault();

  // Note Title
  let noteTitle = document.querySelector("#note-title");
  // Note Body
  let noteBody = document.querySelector("#note-body");
  // Submit Button
  let submitBtn = document.querySelector("#create-note-body [type=submit]");

  // Disable all inputs
  noteTitle.setAttribute("disabled", "disabled");
  noteBody.setAttribute("disabled", "disabled");
  submitBtn.setAttribute("disabled", "disabled");

  // Add a spinner to submit button
  submitBtn.textContent = "";
  submitBtn.classList.add("btn-spinner");
  submitBtn.appendChild(spinner("white"));

  // Submit form data
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      noteTitle: noteTitle.value.trim().toLowerCase(),
      noteBody: noteBody.value.trim()
    })
  })
    .then((res) => res.json())
    .then((resp) => {
      if (resp.statusType === "failed") {
        document
          .querySelector("#create-note-body form")
          .insertBefore(
            messagePanel({ colorType: "danger", content: resp.message }),
            submitBtn
          );
      } else {
        document
          .querySelector("#create-note-body form")
          .insertBefore(
            messagePanel({ colorType: "success", content: resp.message }),
            submitBtn
          );
        // Clean up entries
        document.querySelector("#create-note-body form").reset();
      }

      // Clean Up
      cleanUp(noteTitle, noteBody, submitBtn);
    })
    .catch((e) => {
      document
        .querySelector("#create-note-body form")
        .insertBefore(
          messagePanel({ colorType: "danger", content: e.message }),
          submitBtn
        );

      cleanUp(noteTitle, noteBody, submitBtn);
    });
};

const cleanUp = (noteTitle, noteBody, submitBtn) => {
  // Clean up after 2 seconds
  window.setTimeout(() => {
    // Remove messagePanel
    if (document.querySelector("#message-panel"))
      document
        .querySelector("#message-panel")
        .parentElement.removeChild(document.querySelector("#message-panel"));

    // Remove disabled properties from all inputs
    noteTitle.removeAttribute("disabled");
    noteBody.removeAttribute("disabled");
    submitBtn.removeAttribute("disabled");

    // Remove spinner from submit button
    submitBtn.textContent = "Save Note";
    submitBtn.classList.remove("btn-spinner");
  }, 2000);
};
export default createNote;
