import { useState } from "react";
import { useRouter } from "next/router";
import { ValidateNoteTitle } from "Utils/index";
import styles from "Styles/Note.module.scss";
import Layout from "Components/Layout";

const FetchNote = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [disabledElement, setDisable] = useState(false);
  const [submitText, setSubmitText] = useState("Fetch Note");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validTitle = ValidateNoteTitle(noteTitle);

    // Invalid keyword
    if (validTitle.code == 1) {
      setErrMsg(validTitle.message);
      return false;
    }

    // Disable all form elements
    setDisable(!disabledElement);
    // Change submit btn text
    setSubmitText("Fetching Note...");

    // Fetch note
    const note = await (
      await fetch(`${process.env.NEXT_PUBLIC_NOTES_SERVER_URL}/${noteTitle}`)
    ).json();

    // Revert submit btn text to "Save Note"
    setSubmitText("Fetch Note");

    // Enable all form elements
    setDisable(false);

    // Failed operation
    if (note.code == 1) {
      setErrMsg(note.message);
      return false;
    }

    // Go to note page
    router.push(`/note/${noteTitle}`);
  };

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Fetch Note</h2>

          <form action="" method="POST" onSubmit={handleSubmit}>
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

            <p className="feedback-panel danger">
              <small>{errorMsg}</small>
            </p>
            <button type="submit" disabled={disabledElement}>
              {submitText}
            </button>
          </form>
        </section>

        <footer className={`${styles.footer} ${styles.mt_4}`}>
          <span className="red">N.B:</span>&nbsp; Every notes are automatically
          deleted 1hour after last update.
        </footer>
      </main>
    </Layout>
  );
};

export default FetchNote;
