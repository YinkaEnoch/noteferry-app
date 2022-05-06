import styles from "Styles/MenuBar.module.scss";

const MenuBar = ({ sideBar, toggleSideBar }) => {
  return (
    <section className={styles.container}>
      <p onClick={() => toggleSideBar(!sideBar)}>
        <strong>&#9776;</strong> <span>Menu</span>
      </p>
      <h4>xFerry</h4>
    </section>
  );
};

export default MenuBar;
