import { useState } from "react";
import { ValidateDocTitle } from "Utils/index";
import styles from "Styles/Note.module.scss";
import Layout from "Components/Layout";
import FeedBackPanel from "Components/FeedBackPanel";
import URLPanel from "Components/URLPanel";

const StashDoc = () => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const [docTitle, setDocTitle] = useState("");
  const [doc, setDoc] = useState({});
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [disabledElement, setDisable] = useState(false);
  const [submitText, setSubmitText] = useState("Save Doc");
  const [docUrl, setDocUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Empty title
    if (!docTitle) {
      setFeedback("You cannot submit an empty title");
      setFeedbackType("danger");
      return false;
    }

    const validTitle = ValidateDocTitle(docTitle);

    // Invalid keyword
    if (validTitle.code == 1) {
      setFeedback(validTitle.message);
      setFeedbackType("danger");
      return false;
    }

    // Large file size
    if (doc.size > MAX_FILE_SIZE) {
      setFeedback(
        `File size is larger than maximum size allowed!! 
        File size: ${doc.size / 1024}mb`
      );
      setFeedbackType("danger");
      return false;
    }

    // Disable all form elements
    setDisable(!disabledElement);

    // Change submit btn text to 'Saving'
    setSubmitText("Saving doc...");

    // Create formData
    let formData = new FormData();
    formData.append("docTitle", docTitle);
    formData.append("doc", doc, doc.name);

    let docOp = await fetch(process.env.NEXT_PUBLIC_DOCS_SERVER_URL, {
      method: "POST",
      body: formData,
    });
    let res = await docOp.json();

    // Failed operation
    if (res.code == 1) {
      setFeedback(res.message.toString());
      setFeedbackType("danger");
    }

    // Successful
    if (res.code == 0) {
      setFeedback(res.message);
      setFeedbackType("success");
      setDocUrl(
        process.env.NEXT_PUBLIC_DOCS_APP_URL +
          docTitle.toLowerCase().trim().replace(/\s/g, "-")
      );
      setDocTitle("");
      e.target.reset(); // Clear form
    }

    // Clean up
    setSubmitText("Save Doc");
    setDisable(false);
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
                setFeedback("");
              }}
              disabled={disabledElement}
              value={docTitle}
            />

            <label htmlFor="docBody">
              Attach doc <small>(max size: 5mb)</small>
            </label>
            <input
              id="docBody"
              type="file"
              name="docBody"
              required
              onChange={(e) => setDoc(e.target.files[0])}
            />

            <FeedBackPanel feedback={feedback} feedbackType={feedbackType} />
            <button type="submit" disabled={disabledElement}>
              {submitText}
            </button>
          </form>
        </section>

        {docUrl && (
          <URLPanel title="Doc Link" url={docUrl} urlSetter={setDocUrl} />
        )}

        <footer className={styles.footer}>
          <span className="red">N.B:</span>&nbsp; All documents are
          automatically deleted 30minutes after upload.
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
