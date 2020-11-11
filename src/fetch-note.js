import displayNote from "./display-note.js";
import { spinner, messagePanel } from "./components";
import { API_URL } from "./config.js";

// Create Note Form Handler
const fetchNote = (e) => {
  // prevent default
  e.preventDefault();

  // Note Title
  let noteTitle = document.querySelector("#fnote-title");
  // Submit Button
  let submitBtn = document.querySelector("#fetch-note-body [type=submit]");

  // Disable all inputs
  noteTitle.setAttribute("disabled", "disabled");
  submitBtn.setAttribute("disabled", "disabled");

  // Add a spinner to submit button
  submitBtn.textContent = "";
  submitBtn.classList.add("btn-spinner");
  submitBtn.appendChild(spinner("white"));

  fetch(API_URL + noteTitle.value.trim().toLowerCase(), {
    headers: { "Content-Type": "application/json" }
  })
    .then((res) => res.json())
    .then((resp) => {
      if (resp.statusCode == 0) {
        document
          .querySelector("#fetch-note-body form")
          .insertBefore(
            messagePanel({ colorType: "danger", content: resp.message }),
            submitBtn
          );
        // Clean Up
        cleanUp(noteTitle, submitBtn);
      } else {
        // Clean up search entry
        noteTitle.value = "";
        cleanUp(noteTitle, submitBtn, 200);
        // Display Note
        displayNote(resp);
      }
    })
    .catch((e) => {
      document
        .querySelector("#fetch-note-body form")
        .insertBefore(
          messagePanel({ colorType: "danger", content: e.message }),
          submitBtn
        );

      cleanUp(noteTitle, submitBtn);
    });
};

const cleanUp = (noteTitle, submitBtn, _secs) => {
  // Clean up after 2 seconds
  window.setTimeout(() => {
    // Remove messagePanel
    if (document.querySelector("#message-panel"))
      document
        .querySelector("#message-panel")
        .parentElement.removeChild(document.querySelector("#message-panel"));

    // Remove disabled properties from all inputs
    noteTitle.removeAttribute("disabled");
    submitBtn.removeAttribute("disabled");

    // Remove spinner from submit button
    submitBtn.textContent = "Fetch Note";
    submitBtn.classList.remove("btn-spinner");
  }, _secs || 2000);
};
export default fetchNote;
