import { API_URL } from "./config.js";
import { spinner } from "./components.js";
import { freezeBtns, addMessagePanel, cleanUp } from "./display-utils.js";

/**
 * Delete a note from the DB
 * */
document.querySelector("#delete-note").addEventListener("click", (e) => {
  freezeBtns();
  e.target.textContent = "";
  e.target.classList.add("btn-spinner");
  e.target.appendChild(spinner());

  fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      noteTitle: JSON.parse(sessionStorage.noteferry).noteTitle
    })
  })
    .then((res) => res.json())
    .then((resp) => {
      if (resp.statusType === "failed") {
        addMessagePanel({ colorType: "danger", content: resp.message });

        setTimeout(() => {
          cleanUp(e, "Delete Note");
        }, 2000);
      } else {
        addMessagePanel({ colorType: "success", content: resp.message });

        setTimeout(() => {
          // Redirect to create note
          document
            .querySelector(".active-form")
            .classList.remove("active-form");
          document
            .querySelector("#create-note-body")
            .classList.add("active-form");
          document.querySelector("#create-note").classList.add("active-btn");
        }, 2500);

        setTimeout(() => {
          // Clean up
          cleanUp(e, "Delete Note");
        }, 2000);
      }
    })
    .catch((err) => {
      addMessagePanel({ colorType: "danger", content: err.message });
      // Clean Up
      setTimeout(() => {
        cleanUp(e, "Delete Note");
      }, 2000);
    });
});
