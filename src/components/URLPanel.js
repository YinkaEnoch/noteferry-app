/**
 * Display the url of the note or doc created.
 * The displayed linked can then be copied to access the doc
 * */
import { clipboardHandler } from "Utils/Notes/CopyNote.util";
import styles from "Styles/URLPanel.module.scss";

const URLPanel = ({ title, url, urlSetter }) => {
  return (
    <section className={styles.main}>
      <h5 className={styles.header}>
        <small>{title}</small>
      </h5>
      <p className={styles.url}>
        <small>{url}</small>
      </p>
      <button
        type="button"
        className={styles.btn}
        onClick={async () => {
          await clipboardHandler(url);

          setTimeout(() => {
            urlSetter("");
          }, 3000);
        }}
      >
        Copy Link
      </button>
    </section>
  );
};

export default URLPanel;
