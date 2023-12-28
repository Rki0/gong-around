import { useEffect, useState } from "react";

import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import SideMenuBackground from "./SideMenu/SideMenuBackground";

import styles from "./Layout.module.scss";
import useUser from "@/query/useUser";

const Layout = (props: { children: React.ReactNode }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const toggleMenuHandler = () => {
    setToggleMenu((prev) => !prev);
  };

  const debounce = (func: () => void, wait: number) => {
    let timeout: NodeJS.Timeout;

    return function executedFunction(this: any) {
      const later = () => {
        timeout = null!;
        func.apply(this);
      };

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);
    } as any;
  };

  const detectWindowResize = debounce(() => {
    if (window.innerWidth <= 1024) {
      return;
    }

    setToggleMenu(false);
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", detectWindowResize);

    return () => {
      window.removeEventListener("resize", detectWindowResize);
    };
  }, []);

  const user = useUser();

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
