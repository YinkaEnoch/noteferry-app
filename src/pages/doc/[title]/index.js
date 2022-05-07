import Layout from "Components/Layout";
import { useRouter } from "next/router";
import styles from "Styles/Note.module.scss";

const Doc = () => {
  const router = useRouter();
  const { title } = router.query;

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>
            Doc <em>({title})</em>
          </h2>

          <h4>Doc Title</h4>
          <p id="docTitle"></p>
          <h4>File</h4>
          <p id="docBody"></p>
          <br />
          <h5>Created On</h5>
          <p id="docBody"></p>
        </section>

        <footer className={`${styles.footer} ${styles.mt_4}`}>
          <span className="red">N.B:</span>&nbsp; All documents are
          automatically deleted after 30minutes after upload.
        </footer>
      </main>
    </Layout>
  );
};

export default Doc;
