import c from "create_new_element";
import createNote from "./create-note";
import fetchNote from "./fetch-note";
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
    elementClass: ["action-btn", "active-btn"],
    listener: [
      {
        on: "click",
        callback: (e) => {
          formBody.removeChild(formBody.firstElementChild);
          formBody.appendChild(createNote);
          // Add active-btn class
          document.querySelector(".active-btn").classList.remove("active-btn");
          e.target.classList.add("active-btn");
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
    elementClass: ["action-btn"],
    listener: [
      {
        on: "click",
        callback: (e) => {
          formBody.removeChild(formBody.firstElementChild);
          formBody.appendChild(fetchNote);
          // Add active-btn class
          document.querySelector(".active-btn").classList.remove("active-btn");
          e.target.classList.add("active-btn");
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
