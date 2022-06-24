import styles from "Styles/DeleteModal.module.scss";

const DeleteModal = ({ text }) => {
  return (
    <aside className={styles.deleteModal}>
      <h1>&#9989;</h1>
      <p>{text}</p>
    </aside>
  );
};

export default DeleteModal;
