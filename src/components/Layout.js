import MenuBar from "./MenuBar";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <>
      <MenuBar />
      <main>
        <SideBar />
        {children}
      </main>
    </>
  );
};

export default Layout;
