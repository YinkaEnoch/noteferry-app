import c from "create_new_element";
import styles from "./create-note.module.scss";

const createNote = c({
  elementType: "form",
  elementClass: styles.createNoteBody,
  otherAttr: {
    method: "POST"
  }
});

// Note title label
createNote.appendChild(
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
createNote.appendChild(
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

// Note Body label
createNote.appendChild(
  c({
    elementType: "label",
    elementClass: styles.label,
    elementText: "Note Body",
    otherAttr: {
      for: "note-body"
    }
  })
);

// Note Body input
createNote.appendChild(
  c({
    elementType: "textarea",
    elementId: "note-body",
    elementClass: [styles.formEntry, styles.textarea],
    otherAttr: {
      type: "text",
      placeholder: "a23gvW344QA4ei90lkwe233i"
    }
  })
);

// Create Note Button
createNote.appendChild(
  c({
    elementType: "button",
    elementText: "Save Note",
    elementClass: styles.btn,
    otherAttr: {
      type: "submit"
    }
  })
);

export default createNote;
