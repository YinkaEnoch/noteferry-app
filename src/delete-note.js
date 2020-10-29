import { API_URL } from "./config.js";
import { spinner } from "./components.js";
import { freezeBtns, addMessagePanel, cleanUp } from "./display-utils.js";

/**
 * Delete a note from the DB
 * */
const deleteNote = (e) => {
  freezeBtns();
  e.target.textContent = "";
  e.target.classList.add("btn-spinner");
  e.target.appendChild(spinner("white"));

  fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      noteTitle: JSON.parse(sessionStorage.noteferry).noteTitle
    })
  })
    .then((res) => res.json())
    .then((resp) => {
      if (resp.statusCode == 0) {
        addMessagePanel({ colorType: "danger", content: resp.message });

        window.setTimeout(() => {
          cleanUp(e, "Delete Note");
        }, 2000);
      } else {
        addMessagePanel({ colorType: "success", content: resp.message });

        window.setTimeout(() => {
          // Redirect to create note
          document
            .querySelector(".active-form")
            .classList.remove("active-form");
          document
            .querySelector("#create-note-body")
            .classList.add("active-form");
          document.querySelector("#create-note").classList.add("active-btn");
        }, 1000);
        // Clean up
        cleanUp(e, "Delete Note");
      }
    })
    .catch((err) => {
      addMessagePanel({ colorType: "danger", content: err.message });
      // Clean Up
      setTimeout(() => {
        cleanUp(e, "Delete Note");
      }, 2000);
    });
};

export default deleteNote;
