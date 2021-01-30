import "./styles/index.scss";
import "./styles/form.scss";
import "./styles/display_note.scss";
import createNote from "./create-note";
import fetchNote from "./fetch-note";

const displayCreateNote = () => {
  document.querySelector(".active-form").classList.remove("active-form");
  document.querySelector("#create-note-body").classList.add("active-form");

  document.querySelector(".active-btn").classList.remove("active-btn");
  document.querySelector("#create-note").classList.add("active-btn");
};

// Create Note Button Handler
document
  .querySelector("#create-note")
  .addEventListener("click", displayCreateNote);

const displayFetchNote = () => {
  document.querySelector(".active-form").classList.remove("active-form");
  document.querySelector("#fetch-note-body").classList.add("active-form");

  document.querySelector(".active-btn").classList.remove("active-btn");
  document.querySelector("#fetch-note").classList.add("active-btn");
};
// Fetch Note Button Handler
document
  .querySelector("#fetch-note")
  .addEventListener("click", displayFetchNote);

// Create Form Handler
document
  .querySelector("#create-note-body form")
  .addEventListener("submit", (e) => createNote(e));

// Fetch Form Handler
document
  .querySelector("#fetch-note-body form")
  .addEventListener("submit", (e) => fetchNote(e));

// Hash listener
window.addEventListener("hashchange", (e) => {
  switch (window.location.hash) {
    case "#fetch-note":
      displayFetchNote();
      break;
    default:
      displayCreateNote();
  }
});
