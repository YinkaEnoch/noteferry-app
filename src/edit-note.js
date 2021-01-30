document.querySelector("#edit-note").addEventListener("click", () => {
  // Hide copy, delete and edit note buttons
  document.querySelector("#copy-note").classList.remove("show-btn");
  document.querySelector("#delete-note").classList.remove("show-btn");
  document.querySelector("#edit-note").classList.remove("show-btn");

  // Display discard changes and update note buttons
  document.querySelector("#discard-changes").classList.add("show-btn");
  document.querySelector("#update-note").classList.add("show-btn");

  // Grey out note title
  document.querySelector(".note-title-panel").classList.add("grey-text");

  // Make note body panel editable
  let noteBodyPanel = document.querySelector(".note-body-panel");

  noteBodyPanel.setAttribute("contenteditable", true);
  noteBodyPanel.classList.add("edit-note");
});
