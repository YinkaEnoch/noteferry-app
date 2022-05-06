import styles from "Styles/Note.module.scss";

const CreateNote = () => {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2>Create New Note</h2>

        <form action="" method="POST">
          <label htmlFor="noteTitle">Note Title</label>
          <input
            id="noteTitle"
            type="text"
            name="noteTitle"
            required
            placeholder="Netlify API Key"
          />

          <label htmlFor="noteBody">Note Body</label>
          <textarea
            id="noteBody"
            name="noteBody"
            required
            placeholder="0123456789abcdefghij"
            wrap="hard"
          ></textarea>

          <button type="submit">Save Note</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <span className="red">N.B:</span>&nbsp; Every notes are automatically
        deleted after 12hours after last update.
      </footer>
    </main>
  );
};

export default CreateNote;
