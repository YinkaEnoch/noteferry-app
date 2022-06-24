import { useState } from "react";
import { ValidateNoteTitle } from "Utils/index";
import styles from "Styles/Note.module.scss";
import Layout from "Components/Layout";
import FeedBackPanel from "Components/FeedBackPanel";
import URLPanel from "Components/URLPanel";
import Footer from "Components/Footer";

const CreateNote = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [disabledElement, setDisable] = useState(false);
  const [submitText, setSubmitText] = useState("Save Note");
  const [noteUrl, setNoteUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validTitle = ValidateNoteTitle(noteTitle);

    // Empty word
    if (!noteTitle || !noteBody) {
      setFeedback("You cannot create an empty note!!");
      setFeedbackType("danger");
      return false;
    }

    // Invalid keyword
    if (validTitle.code == 1) {
      setFeedback(validTitle.message);
      setFeedbackType("danger");
      return false;
    }

    // Disable all form elements
    setDisable(!disabledElement);

    // Change submit btn text to 'Saving'
    setSubmitText("Saving Note...");

    // Submit note
    const noteOp = await fetch(process.env.NEXT_PUBLIC_NOTES_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        noteTitle: noteTitle.toLowerCase().replace(/\s/g, "-").trim(),
        noteBody: noteBody.trim(),
      }),
    });
    const res = await noteOp.json();
    // Failed operation
    if (res.code == 1) {
      setFeedback(res.message);
      setFeedbackType("danger");
    }

    if (res.code == 0) {
      setFeedback(res.message);
      setFeedbackType("success");
      setNoteTitle("");
      setNoteBody("");
      setNoteUrl(
        process.env.NEXT_PUBLIC_NOTES_APP_URL +
          noteTitle.toLowerCase().trim().replace(/\s/g, "-")
      );
    }

    // Revert submit btn text to "Save Note"
    setSubmitText("Save Note");

    // Enable all form elements
    setDisable(false);
  };
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Create New Note</h2>

          <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="noteTitle">Note Title</label>
            <input
              id="noteTitle"
              type="text"
              name="noteTitle"
              required
              value={noteTitle}
              placeholder="Netlify API Key"
              onInput={(e) => {
                setNoteTitle(e.target.value);
                setFeedback("");
              }}
            />

            <label htmlFor="noteBody">Note Body</label>
            <textarea
              id="noteBody"
              name="noteBody"
              required
              placeholder="0123456789abcdefghij"
              wrap="hard"
              onInput={(e) => {
                setNoteBody(e.target.value);
                setFeedback("");
              }}
              disabled={disabledElement}
              value={noteBody}
            ></textarea>

            <FeedBackPanel feedback={feedback} feedbackType={feedbackType} />
            <button type="submit" disabled={disabledElement}>
              {submitText}
            </button>
          </form>
        </section>

        {noteUrl && (
          <URLPanel title="Note Link" url={noteUrl} urlSetter={setNoteUrl} />
        )}

        <Footer text="Every notes are automatically deleted 1hour after last update." />
      </main>
    </Layout>
  );
};

export default CreateNote;
