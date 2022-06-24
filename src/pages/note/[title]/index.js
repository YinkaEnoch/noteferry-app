import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import parseDate from "Utils/parseDate";
import DeleteItem from "Utils/DeleteItem.util";
import copyNote from "Utils/Notes/CopyNote.util";
import Layout from "Components/Layout";
import styles from "Styles/DisplayNote.module.scss";
import EditModal from "Components/EditModal";
import NotFound from "Components/NotFound";
import DeleteModal from "Components/DeletedModal";
import FeedBackPanel from "Components/FeedBackPanel";
import Footer from "Components/Footer";

const Note = (props) => {
  const router = useRouter();
  const [noteBody, setNoteBody] = useState(props.noteBody);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");
  const [copyBtnText, setCopyBtn] = useState("Copy");
  const [deleteBtnText, setDeleteBtn] = useState("Delete");
  const [disabledElement, setDisable] = useState(false);
  const [showDeleteModal, setShowDelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [lastModified, setLastModified] = useState(parseDate(props.updatedAt));
  const { title } = router.query;

  useEffect(() => {
    setTimeout(() => {
      setFeedback("");
    }, 2000);
  }, [feedback]);

  return (
    <Layout>
      <main className={styles.main}>
        {!props.noteTitle && <NotFound type="note" title={title} />}
        {props.noteTitle && (
          <>
            <section className={styles.panel}>
              <h2>
                Note <em>({title})</em>
              </h2>

              <h5>Note Title</h5>
              <p id="noteTitle">{props.noteTitle}</p>
              <h5>Note Body</h5>
              <p id="noteBody">{noteBody}</p>
              <h5>Created On</h5>
              <p id="createdAt">{parseDate(props.createdAt)}</p>
              <h5>Last Modified</h5>
              <p id="updatedAt">{lastModified}</p>
            </section>

            <aside className={styles.feedback}>
              <FeedBackPanel
                feedback={feedback}
                feedbackType={feedbackType}
                textAlign="left"
              />
              <button
                type="button"
                disabled={disabledElement}
                onClick={() =>
                  copyNote({
                    setCopyBtn: setCopyBtn,
                    setFeedback: setFeedback,
                    setFeedbackType: setFeedbackType,
                    noteBody: noteBody,
                    setDisable: setDisable,
                  })
                }
              >
                {copyBtnText}
              </button>
              <button
                type="button"
                disabled={disabledElement}
                onClick={() => setShowEditModal(true)}
              >
                Edit
              </button>
              <button
                type="button"
                disabled={disabledElement}
                onClick={() => {
                  DeleteItem({
                    setDeleteBtn: setDeleteBtn,
                    setDisable: setDisable,
                    setShowDelModal: setShowDelModal,
                    setFeedback: setFeedback,
                    setFeedbackType: setFeedbackType,
                    router: router,
                    title: props.noteTitle,
                    itemType: "note",
                  });
                }}
              >
                {deleteBtnText}
              </button>
            </aside>

            <Footer text="Every notes are automatically deleted after 1hour after last update." />
          </>
        )}

        {
          /* Edit Modal */
          showEditModal && (
            <EditModal
              noteTitle={props.noteTitle}
              noteBody={noteBody}
              setShowEditModal={setShowEditModal}
              setNoteBody={setNoteBody}
              setFeedback={setFeedback}
              setFeedbackType={setFeedbackType}
              setLastModified={setLastModified}
            />
          )
        }

        {
          /*Delete modal*/
          showDeleteModal && <DeleteModal text="Note deleted!!" />
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
