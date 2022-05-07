import { useState } from "react";
import { ValidateDocTitle } from "Utils/index";
import styles from "Styles/Note.module.scss";
import Layout from "Components/Layout";

const StashDoc = () => {
  const [docTitle, setDocTitle] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [disabledElement, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //const validTitle = ValidateNoteTitle(noteTitle);

    // Invalid keyword
    if (validTitle.code == 1) {
      setErrMsg(validTitle.message);
      return false;
    }

    // Submit note
  };
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Stash New Doc</h2>

          <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="docTitle">Doc Title</label>
            <input
              id="docTitle"
              type="text"
              name="docTitle"
              required
              placeholder="Laughing meme"
              onInput={(e) => {
                setDocTitle(e.target.value);
                setErrMsg("");
              }}
              disabled={disabledElement}
            />

            <label htmlFor="docBody">
              Attach doc <small>(max size: 5mb)</small>
            </label>
            <input id="docBody" type="file" name="docBody" required />

            <p className="error-msg">{errorMsg}</p>
            <button type="submit">Stash Doc</button>
          </form>
        </section>

        <footer className={styles.footer}>
          <span className="red">N.B:</span>&nbsp; All documents are
          automatically deleted after 30minutes after upload.
          {/*
        <p>Supported file types:</p>
        <ul>
          <li>
            Music: <small>mp3,ogg</small>
          </li>
          <li>
            Images: <small>jpeg, jpg, png, gif, webp</small>
          </li>
          <li>
            Files: <small>pdf, doc, docx, txt</small>
          </li>
        </ul>
        */}
        </footer>
      </main>
    </Layout>
  );
};

export default StashDoc;
