import { useState } from "react";
import { ValidateNoteTitle } from "Utils/index";
import styles from "Styles/Note.module.scss";
import { useRouter } from "next/router";

const FetchNote = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validTitle = ValidateNoteTitle(noteTitle);

    // Invalid keyword
    if (validTitle.code == 1) {
      setErrMsg(validTitle.message);
      return false;
    }

    // Go to note page
    router.push(`/note/${noteTitle}`);
  };

  return (
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
          />

          <p className="error-msg">{errorMsg}</p>
          <button type="submit">Fetch Note</button>
        </form>
      </section>

      <footer className={`${styles.footer} ${styles.mt_4}`}>
        <span className="red">N.B:</span>&nbsp; Every notes are automatically
        deleted after 12hours after last update.
      </footer>
    </main>
  );
};

export default FetchNote;
