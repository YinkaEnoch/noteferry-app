import "./styles/index.scss";
import "./styles/form.scss";
import "./styles/display_note.scss";
import createNote from "./create-note";
import fetchNote from "./fetch-note";

//const url = "https://noteferry.herokuapp.com/noteferry/note";

// Create Note Button Handler
document.querySelector("#create-note").addEventListener("click", (e) => {
  document.querySelector(".active-form").classList.remove("active-form");
  document.querySelector("#create-note-body").classList.add("active-form");

  // Add active-btn class
  if (document.querySelector(".active-btn")) {
    document.querySelector(".active-btn").classList.remove("active-btn");
  }
  e.target.classList.add("active-btn");
});

// Fetch Note Button Handler
document.querySelector("#fetch-note").addEventListener("click", (e) => {
  document.querySelector(".active-form").classList.remove("active-form");
  document.querySelector("#fetch-note-body").classList.add("active-form");

  // Add active-btn class
  if (document.querySelector(".active-btn")) {
    document.querySelector(".active-btn").classList.remove("active-btn");
  }
  e.target.classList.add("active-btn");
});

// Create Form Handler
document
  .querySelector("#create-note-body form")
  .addEventListener("submit", (e) => createNote(e));

// Fetch Form Handler
document
  .querySelector("#fetch-note-body form")
  .addEventListener("submit", (e) => fetchNote(e));
