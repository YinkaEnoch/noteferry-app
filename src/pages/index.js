import Link from "next/link";
import styles from "Styles/index.module.scss";
import { useState } from "react";
import Layout from "Components/Layout";

export default function Home() {
  return (
    <Layout>
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
    </Layout>
  );
}
