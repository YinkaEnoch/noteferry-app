/**
 * The panel returns a 404 when a non-existing note or doc is been accessed. */
import Link from "next/link";
import styles from "Styles/NotFound.module.scss";

const NotFound = ({ type, title }) => {
  return (
    <section className={styles.notFound}>
      <h4>404: Not Found!!</h4>
      <p>
        The specified {type.toLowerCase() === "note" ? "note" : "doc"} &apos;
        {title}&apos; does not exist or has been deleted.
      </p>
      <Link
        href={type.toLowerCase() === "note" ? "/note/create" : "/doc/stash"}
      >
        <a>Create a New {type.toLowerCase() === "note" ? "Note" : "Doc"}</a>
      </Link>
    </section>
  );
};

export default NotFound;
