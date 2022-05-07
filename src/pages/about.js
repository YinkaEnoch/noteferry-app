import Layout from "Components/Layout";
import styles from "Styles/About.module.scss";

const About = () => {
  return (
    <Layout>
      <main className={styles.main}>
        <h2>About</h2>

        <p>
          xFerry is a simple app that makes it easy to share text or small
          file(s) between devices. I created the app due to the complexities I
          go through while sharing text, mostly wallet addresses and API keys
          between my devices.
        </p>
        <p>
          The functionality to share small files was later added to make it
          easier to share docs like images, pdfs between my devices
        </p>
        <p>Pull request for additional features are welcome</p>
      </main>
    </Layout>
  );
};

export default About;
