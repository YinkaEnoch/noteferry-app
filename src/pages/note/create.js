import { useState } from "react";
import { ValidateNoteTitle } from "Utils/index";
import styles from "Styles/Note.module.scss";
import Layout from "Components/Layout";

const CreateNote = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [disabledElement, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validTitle = ValidateNoteTitle(noteTitle);

    // Invalid keyword
    if (validTitle.code == 1) {
      setErrMsg(validTitle.message);
      return false;
    }

    console.log({ noteTitle, noteBody });
    // Submit note
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
              placeholder="Netlify API Key"
              onInput={(e) => {
                setNoteTitle(e.target.value);
                setErrMsg("");
              }}
              disabled={disabledElement}
            />

            <label htmlFor="noteBody">Note Body</label>
            <textarea
              id="noteBody"
              name="noteBody"
              required
              placeholder="0123456789abcdefghij"
              wrap="hard"
              onInput={(e) => setNoteBody(e.target.value)}
              disabled={disabledElement}
            ></textarea>

            <p className="error-msg">{errorMsg}</p>
            <button type="submit">Save Note</button>
          </form>
        </section>

        <footer className={styles.footer}>
          <span className="red">N.B:</span>&nbsp; Every notes are automatically
          deleted after 12hours after last update.
        </footer>
      </main>
    </Layout>
  );
};

export default CreateNote;
