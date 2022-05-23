import { useState } from "react";
import styles from "Styles/EditModal.module.scss";
import parseDate from "Utils/parseDate";

const EditModal = ({
  noteTitle,
  noteBody,
  setShowEditModal,
  setNoteBody,
  setFeedback,
  setFeedbackType,
  setLastModified,
}) => {
  const [submitText, setSubmitText] = useState("Update Note");
  const [newNoteBody, setNewNoteBody] = useState(noteBody);
  const [disabledElement, setDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_NOTES_SERVER_URL + "/" + noteTitle;
    console.log(url);
    // freeze all buttons
    setDisable(true);
    // change button to deleting
    setSubmitText("Updating Note...");

    // Save new update
    const noteOp = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        noteBody: newNoteBody.trim(),
      }),
    });
    const res = await noteOp.json();
    console.log(res);

    // Unfreeze buttons
    setDisable(false);
    setSubmitText("Update Note");

    // Set feedback message
    setFeedback(res.message);
    if (res.code == 1) {
      setFeedbackType("danger");
    } else {
      setFeedbackType("success");
      setNoteBody(res.data.noteBody);
      setLastModified(parseDate(res.data.updatedAt));
    }
    setShowEditModal(false);
  };

  return (
    <main className={styles.main}>
      <section className={styles.modal}>
        <h2>Edit Note</h2>

        <p>
          <strong>Note Title</strong>
        </p>
        <p>{noteTitle}</p>

        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="newNoteBody">
            <strong>Note Body</strong>
          </label>
          <textarea
            id="newNoteBody"
            name="newNoteBody"
            required
            placeholder="0123456789abcdefghij"
            wrap="hard"
            onInput={(e) => {
              setNewNoteBody(e.target.value);
            }}
            disabled={disabledElement}
            value={newNoteBody}
          ></textarea>

          <div className={styles.btnBody}>
            <button type="submit" disabled={disabledElement}>
              {submitText}
            </button>

            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              disabled={disabledElement}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditModal;
