const copyNote = (e) => {
  // Create a textarea element
  const copyText = document.createElement("textarea");
  copyText.id = "copy-note-textarea";
  copyText.value = document.querySelector(".note-body-panel").innerHTML;
  copyText.style.position = "fixed";
  copyText.style.top = "-100000px";
  copyText.style.left = "-100000px";

  // Attach textarea to DOM
  document.body.appendChild(copyText);

  // Select the text field
  copyText.select();
  // Select text field - mobile devices
  copyText.setSelectionRange(0, 999999);

  // Copy the selected text
  document.execCommand("copy");

  // Change button text to copied
  e.target.textContent = "Copied";

  //***Clean Up
  setTimeout(() => {
    document.body.removeChild(copyText);
    e.target.textContent = "Copy Note";
  }, 2000);
};

export default copyNote;
