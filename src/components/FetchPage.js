import { useState } from "react";
import { useRouter } from "next/router";
import styles from "Styles/Note.module.scss";
import Layout from "Components/Layout";
import Footer from "./Footer";

const FetchPage = (props) => {
  const [title, setTitle] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [disabledElement, setDisable] = useState(false);
  const [submitText, setSubmitText] = useState(props.btnText);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validTitle = props.Validator(title);

    // Invalid keyword
    if (validTitle.code == 1) {
      setErrMsg(validTitle.message);
      return false;
    }

    // Disable all form elements
    setDisable(!disabledElement);
    // Change submit btn text
    setSubmitText(props.btnLoadingText);

    // Fetch note
    const resp = await (await fetch(`${props.fetchApiUrl}/${title}`)).json();

    // Revert submit btn text to "Save Note"
    setSubmitText(props.btnText);

    // Enable all form elements
    setDisable(false);

    // Failed operation
    if (resp.code == 1) {
      setErrMsg(resp.message);
      return false;
    }

    // Display note or doc
    router.push(`/${props.pageUrl}/${title}`);
  };

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>{props.pageTitle}</h2>

          <form action="" method="POST" onSubmit={handleSubmit}>
            <label htmlFor="title">{props.inputLabel}</label>
            <input
              id="title"
              type="text"
              name="title"
              required
              placeholder={props.inputPlaceholder}
              onInput={(e) => {
                setTitle(e.target.value);
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

        <Footer text={props.footerText} />
      </main>
    </Layout>
  );
};

export default FetchPage;
