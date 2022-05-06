import Link from "next/link";
import styles from "Styles/SideBar.module.scss";

const SideBar = ({ sideBar, toggleSideBar }) => {
  return (
    <section
      className={`${styles.mainContainer} ${sideBar && styles.showSideBar}`}
      onClick={() => {
        toggleSideBar(!sideBar);
      }}
    >
      <h2>
        <span>x</span>FERRY
      </h2>

      <nav className={styles.nav}>
        <ul>
          <li className={styles.navItem}>
            <Link href="/note/create"> Create Note</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/note/fetch">Fetch Note</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/doc/stash">Stash Doc</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/doc/retrieve">Retrieve Doc</Link>
          </li>
        </ul>

        <ul className={styles.footerNav}>
          <li className={styles.navItem}>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Link
        href="https://yinkaenoch.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        <a className={styles.author}>@yinkaenoch</a>
      </Link>
    </section>
  );
};

export default SideBar;
