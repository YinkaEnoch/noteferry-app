import c from "create_new_element";
import createNote from "./create-note";
import styles from "./index.scss";

const root = document.querySelector("#root");

// App Title
root.appendChild(
  c({
    elementType: "h1",
    elementText: "Note Ferry",
    elementClass: "app-title"
  })
);

// App Subtitle
root.appendChild(
  c({
    elementType: "p",
    elementText: "text transfer made easier",
    elementClass: "app-subtitle"
  })
);

// Action Container
const actionBody = c({ elementType: "div", elementClass: "action-body" });
root.appendChild(actionBody);

// Create Note Button
actionBody.appendChild(
  c({
    elementType: "button",
    elementText: "Create Note",
    elementClass: ["btn", "btn-primary"],
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
    elementClass: ["btn", "btn-default"],
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
// Form Container
const formBody = c({
  elementType: "section",
  elementClass: "form-body"
});

// Append FormBody to root
formBody.appendChild(createNote);
root.appendChild(formBody);

// Copyright
root.appendChild(
  c({
    elementType: "footer",
    innerHTML:
      "this app is crafted by <a href='https://bit.ly/yinkaenoch' target='_blank' rel='noreferrer noopener'>@yinkaenoch</a>",
    elementClass: "footer"
  })
);
