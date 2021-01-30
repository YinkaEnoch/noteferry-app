import "./copy-note.js";
import "./delete-note.js";
import "./discard-changes.js";
import "./edit-note.js";
import "./update-note.js";
import { parseDate } from "./utils.js";

const displayNote = (resp) => {
  // Add active-form class to display-note-body
  document.querySelector(".active-form").classList.remove("active-form");
  document.querySelector("#display-note-body").classList.add("active-form");
  // Remove active-btn from current element
  document.querySelector(".active-btn").classList.remove("active-btn");

  // Append response to DOM
  document.querySelector(".note-title-panel").textContent = resp.data.noteTitle;
  document.querySelector(".note-body-panel").textContent = resp.data.noteBody;
  document.querySelector("#created-on").textContent = parseDate(
    resp.data.createdAt
  );
  document.querySelector("#last-modified").textContent = parseDate(
    resp.data.updatedAt
  );

  // Save response to storage
  sessionStorage.noteferry = JSON.stringify(resp.data);
};

export default displayNote;
