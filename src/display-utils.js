import { messagePanel } from "./components.js";

/**
 * Disable all buttons when one of the buttons is pressed
 * This would make sure that no other action is fired by the user
 * while one action is ongoing
 * */
const freezeBtns = () => {
  document.querySelector("#copy-note").setAttribute("disabled", "disabled");
  document.querySelector("#delete-note").setAttribute("disabled", "disabled");
  document.querySelector("#edit-note").setAttribute("disabled", "disabled");
  // Remove contenteditable from  note-body-panel
  document.querySelector(".note-body-panel").removeAttribute("contenteditable");
};

/**
 * Remove disabled attribute from all buttons
 * */
const unFreezeBtns = () => {
  document.querySelector("#copy-note").removeAttribute("disabled");
  document.querySelector("#delete-note").removeAttribute("disabled");
  document.querySelector("#edit-note").removeAttribute("disabled");
};

/**
 * Create a message panel and attach it to the DOM
 * */
const addMessagePanel = ({ colorType, content }) => {
  document
    .querySelector(".display-action-body")
    .parentElement.insertBefore(
      messagePanel({ colorType, content }),
      document.querySelector(".display-action-body")
    );
};

/**
 * Remove message panel from the DOM
 * */
const removeMessagePanel = () => {
  if (document.querySelector("#message-panel"))
    document
      .querySelector("#message-panel")
      .parentElement.removeChild(document.querySelector("#message-panel"));
};

/**
 * Clean Up the DOM after any operation
 * */
const cleanUp = (e, content) => {
  unFreezeBtns();
  removeMessagePanel();
  e.target.textContent = content;
  e.target.classList.remove("btn-spinner");
};

export {
  freezeBtns,
  unFreezeBtns,
  addMessagePanel,
  removeMessagePanel,
  cleanUp
};
