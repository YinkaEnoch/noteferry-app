import { useState } from "react";
import MenuBar from "./MenuBar";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  const [sideBar, toggleSideBar] = useState(false);

  return (
    <>
      <MenuBar sideBar={sideBar} toggleSideBar={toggleSideBar} />
      <main style={{ height: "100%" }}>
        <SideBar sideBar={sideBar} toggleSideBar={toggleSideBar} />
        {children}
      </main>
    </>
  );
};

export default Layout;
