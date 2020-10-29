/* GENERAL PURPOSE UTILITIES */

/**
 * Remove a spinner from any element
 * */
const removeSpinner = () => {
  // Remove btn-spinner class from spinner parent
  document
    .querySelector("#spinner")
    .parentElement.classList.remove("btn-spinner");
  // Remove spinner from parent
  document
    .querySelector("#spinner")
    .parentElement.removeChild(document.querySelector("#spinner"));
};

export { removeSpinner };
