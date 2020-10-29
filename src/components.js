import c from "create_new_element";

// Spinner Element
const spinner = (colorType) => {
  let color = "#1267ef";
  if (colorType.toLowerCase() === "white") {
    color = "#fff";
  }

  return c({
    elementType: "p",
    elementId: "spinner",
    elementClass: "spinner",
    otherAttr: {
      style: `border-color: ${color}`
    }
  });
};

// Server message container
const messagePanel = ({ colorType, content }) => {
  let color;
  colorType.toLowerCase() === "success"
    ? (color = "#4caf50")
    : (color = "#f44336");

  return c({
    elementType: "p",
    elementId: "message-panel",
    elementText: content,
    otherAttr: {
      style: `text-align: center; color:${color}`
    }
  });
};
export { spinner, messagePanel };
