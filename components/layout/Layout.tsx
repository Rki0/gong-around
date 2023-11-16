import { useState } from "react";

import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import SideMenuBackground from "./SideMenu/SideMenuBackground";

import styles from "./Layout.module.scss";

const Layout = (props: { children: React.ReactNode }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const toggleMenuHandler = () => {
    setToggleMenu((prev) => !prev);
  };

  return (
    <div className={styles.layout}>
      <Header toggleMenuHandler={toggleMenuHandler} />

      <SideMenuBackground
        toggleMenu={toggleMenu}
        toggleMenuHandler={toggleMenuHandler}
      />

      <SideMenu toggleMenu={toggleMenu} toggleMenuHandler={toggleMenuHandler} />

      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
