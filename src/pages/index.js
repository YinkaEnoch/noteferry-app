import Link from "next/link";
import styles from "Styles/index.module.scss";
import SideBar from "Components/SideBar";
import MenuBar from "Components/MenuBar";
import { useState } from "react";

export default function Home() {
  const [sideBar, toggleSideBar] = useState(false);

  return (
    <>
      <MenuBar sideBar={sideBar} toggleSideBar={toggleSideBar} />
      <main className={styles.mainContainer}>
        <SideBar sideBar={sideBar} toggleSideBar={toggleSideBar} />
        <section className={styles.hero}>
          <h2>Share it!!!</h2>

          <p>
            Share your text () without much hassle!!
            <br />
            <Link href="/note/create">Create a new note</Link>
          </p>

          <p>
            Share a simple document without stress.
            <br />
            <Link href="/doc/stash">Share document</Link>
          </p>
        </section>
      </main>
    </>
  );
}
