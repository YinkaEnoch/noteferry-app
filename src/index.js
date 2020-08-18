import c from "create_new_element";
import createNote from "./create-note";

const root = document.querySelector("#root");

// App Title
root.appendChild(
  c({
    elementType: "h1",
    elementText: "Note Ferry"
  })
);

// App Subtitle
root.appendChild(
  c({
    elementType: "p",
    elementText: "text transfer made easier"
  })
);

// Action Container
const actionBody = c({ elementType: "div" });
root.appendChild(actionBody);

// Form Container
const formBody = c({
  elementType: "section"
});

// Create Note Button
actionBody.appendChild(
  c({
    elementType: "button",
    elementText: "Create New Note",
    listener: [
      {
        on: "click",
        callback: () => {
          formBody.removeChild(formBody.firstElementChild);
          formBody.appendChild(createNote);
        }
      }
    ]
  })
);

// Fetch Note Button
actionBody.appendChild(
  c({
    elementType: "button",
    elementText: "Fetch Note",
    listener: [
      {
        on: "click",
        callback: () => {
          console.log("fetch note");
        }
      }
    ]
  })
);

// Append FormBody to root
formBody.appendChild(createNote);
root.appendChild(formBody);

// Copyright
root.appendChild(
  c({
    elementType: "footer",
    innerHTML:
      "this app is crafted by <a href='https://bit.ly/yinkaenoch' target='_blank' rel='noreferrer noopener'>@yinkaenoch</a>"
  })
);
