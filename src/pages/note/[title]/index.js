import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import parseDate from "Utils/parseDate";
import copyNote from "Utils/DisplayNote/copyNote";
import Layout from "Components/Layout";
import styles from "Styles/DisplayNote.module.scss";
import deleteNote from "Utils/DisplayNote/deleteNote";

const Note = (props) => {
  const router = useRouter();
  const [actionMsg, setActionMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [copyBtnText, setCopyBtn] = useState("Copy");
  const [deleteBtnText, setDeleteBtn] = useState("Delete");
  const [disabledElement, setDisable] = useState(false);
  const [showDeleteModal, setShowDelModal] = useState(false);
  const { title } = router.query;

  return (
    <Layout>
      <main className={styles.main}>
        {!props.noteTitle && (
          <section className={styles.notFound}>
            <h4>404: Not Found!!</h4>
            <p>
              The specified note '{title}' does not exist or has been deleted.
            </p>
            <Link href="/note/create">
              <a>Create a New Note</a>
            </Link>
          </section>
        )}
        {props.noteTitle && (
          <>
            <section className={styles.panel}>
              <h2>
                Note <em>({title})</em>
              </h2>

              <h5>Note Title</h5>
              <p id="noteTitle">{props.noteTitle}</p>
              <h5>Note Body</h5>
              <p id="noteBody">{props.noteBody}</p>
              <h5>Created On</h5>
              <p id="createdAt">{parseDate(props.createdAt)}</p>
              <h5>Last Modified</h5>
              <p id="updatedAt">{parseDate(props.updatedAt)}</p>
            </section>

            <aside className={styles.actionPanel}>
              <p className={`${msgType == "success" ? "success" : "danger"}`}>
                <small>{actionMsg}</small>
              </p>
              <button
                type="button"
                disabled={disabledElement}
                onClick={() =>
                  copyNote({
                    setCopyBtn: setCopyBtn,
                    setActionMsg: setActionMsg,
                    setMsgType: setMsgType,
                    noteBody: props.noteBody,
                    setDisable: setDisable,
                  })
                }
              >
                {copyBtnText}
              </button>
              <button type="button" disabled={disabledElement}>
                Edit
              </button>
              <button
                type="button"
                disabled={disabledElement}
                onClick={() => {
                  deleteNote({
                    setDeleteBtn: setDeleteBtn,
                    setDisable: setDisable,
                    setShowDelModal: setShowDelModal,
                    setActionMsg: setActionMsg,
                    setMsgType: setMsgType,
                    router: router,
                    noteTitle: props.noteTitle,
                  });
                }}
              >
                {deleteBtnText}
              </button>
            </aside>

            <footer className={styles.footer}>
              <span className="red">N.B:</span>&nbsp; Every notes are
              automatically deleted after 12hours after last update.
            </footer>
          </>
        )}

        {
          /*Delete modal*/

          showDeleteModal && (
            <aside className={styles.deleteModal}>
              <h1>&#9989;</h1>
              <p>Note deleted!!</p>
            </aside>
          )
        }
      </main>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_NOTES_SERVER_URL + "/" + params.title;
  const { data } = await (await fetch(API_URL)).json();

  if (!data) return { props: {} };

  const { noteTitle, noteBody, createdAt, updatedAt } = data;
  return { props: { noteTitle, noteBody, createdAt, updatedAt } };
}

export default Note;
