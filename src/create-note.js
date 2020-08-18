import c from "create_new_element";

const createNote = c({
  elementType: "form",
  elementClass: "create-note-body",
  otherAttr: {
    method: "POST"
  }
});

// Note title label
createNote.appendChild(
  c({
    elementType: "label",
    elementText: "Note Title",
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
    otherAttr: {
      type: "submit"
    }
  })
);

export default createNote;
