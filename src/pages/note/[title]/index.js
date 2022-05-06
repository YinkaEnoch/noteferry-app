import { useRouter } from "next/router";
import styles from "Styles/Note.module.scss";

const Note = () => {
  const router = useRouter();
  const { title } = router.query;

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2>
          Note <em>({title})</em>
        </h2>

        <h4>Note Title</h4>
        <p id="noteTitle"></p>
        <h4>Note Body</h4>
        <p id="noteBody"></p>
        <br />
        <h5>Created On</h5>
        <p id="noteBody"></p>
        <h5>Last Modified</h5>
        <p id="noteBody"></p>
      </section>

      <footer className={`${styles.footer} ${styles.mt_4}`}>
        <span className="red">N.B:</span>&nbsp; Every notes are automatically
        deleted after 12hours after last update.
      </footer>
    </main>
  );
};

export default Note;
