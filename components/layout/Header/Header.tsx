import Link from "next/link";

import Hamburger from "@/assets/hamburger.svg";
import Navigation from "@/components/Navigation";

import styles from "./Header.module.scss";

interface HeaderProps {
  toggleMenuHandler: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.link}>
        공.Around
      </Link>

      <div className={styles.hamburger_icon} onClick={props.toggleMenuHandler}>
        <Hamburger />
      </div>

      <Navigation
        nav_style={styles.float_menu}
        list_style={styles.float_menu_list}
      />
    </header>
  );
};

export default Header;
