import { useState } from "react";
import { useRouter } from "next/router";
import { ValidateTitle } from "Utils/index";
import styles from "Styles/Note.module.scss";
import Layout from "Components/Layout";

const FetchDoc = () => {
  const [docTitle, setDocTitle] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validTitle = ValidateTitle(docTitle);

    // Invalid keyword
    if (validTitle.code == 1) {
      setErrMsg(validTitle.message);
      return false;
    }

    // Go to doc page
    router.push(`/doc/${docTitle}`);
  };

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Retrieve Doc</h2>

          <form action="" method="POST" onSubmit={handleSubmit}>
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
            />

            <p className="error-msg">{errorMsg}</p>
            <button type="submit">Fetch Doc</button>
          </form>
        </section>

        <footer className={`${styles.footer} ${styles.mt_4}`}>
          <span className="red">N.B:</span>&nbsp; All documents are
          automatically deleted 15minutes after upload.
        </footer>
      </main>
    </Layout>
  );
};

export default FetchDoc;
