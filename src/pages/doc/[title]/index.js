import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "Components/Layout";
import parseDate from "Utils/parseDate";
import DeleteItem from "Utils/DeleteItem.util";
import styles from "Styles/DisplayNote.module.scss";
import NotFound from "Components/NotFound";
import Footer from "Components/Footer";
import DeleteModal from "Components/DeletedModal";
import FeedBackPanel from "Components/FeedBackPanel";

const Doc = ({ docTitle, fileName, createdAt }) => {
  const [deleteBtnText, setDeleteBtn] = useState("Delete");
  const [disabledElement, setDisable] = useState(false);
  const [showDeleteModal, setShowDelModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");
  const router = useRouter();
  const { title } = router.query;
  const downloadLink = `${process.env.NEXT_PUBLIC_DOCS_UPLOADS_URL}/${fileName}`;

  useEffect(() => {
    setTimeout(() => {
      setFeedback("");
    }, 2000);
  }, [feedback]);

  return (
    <Layout>
      <main className={styles.main}>
        {!fileName && <NotFound type="doc" title={title} />}

        {fileName && (
          <>
            <section className={styles.panel}>
              <h2>
                Doc <em>({title})</em>
              </h2>

              <h5>Created On</h5>
              <p id="createdAt">{parseDate(createdAt)}</p>

              <aside className={styles.feedback}>
                <FeedBackPanel
                  feedback={feedback}
                  feedbackType={feedbackType}
                />
                <Link href={downloadLink}>
                  <a
                    className={styles.button}
                    target="_blank"
                    rel="noreferrer noopener"
                    download={fileName}
                  >
                    Download Doc
                  </a>
                </Link>
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
                      title: docTitle,
                      itemType: "doc",
                    });
                  }}
                >
                  {deleteBtnText}
                </button>
              </aside>
            </section>
            <Footer text="All documents are automatically deleted after 30minutes after upload." />

            {showDeleteModal && <DeleteModal text="Document deleted!!" />}
          </>
        )}
      </main>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_DOCS_SERVER_URL + "/" + params.title;
  const { data } = await (await fetch(API_URL)).json();

  if (!data) return { props: {} };

  const { docTitle, fileName, createdAt } = data;
  return { props: { docTitle, fileName, createdAt } };
}

export default Doc;
