import c from "create_new_element";
import styles from "./create-note.module.scss";

const fetchNote = c({
  elementType: "form",
  elementClass: styles.fetchNoteBody,
  otherAttr: {
    method: "POST"
  }
});

// Note title label
fetchNote.appendChild(
  c({
    elementType: "label",
    elementText: "Note Title",
    elementClass: styles.label,
    otherAttr: {
      for: "note-title"
    }
  })
);

// Note title input
fetchNote.appendChild(
  c({
    elementType: "input",
    elementId: "note-title",
    elementClass: styles.formEntry,
    otherAttr: {
      type: "text",
      placeholder: "Netlify API key"
    }
  })
);

// Fetch Note Button
fetchNote.appendChild(
  c({
    elementType: "button",
    elementText: "Fetch Note",
    elementClass: styles.btn,
    otherAttr: {
      type: "submit"
    }
  })
);

export default fetchNote;
