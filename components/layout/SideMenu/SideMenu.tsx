import Navigation from "@/components/Navigation";
import Close from "@/assets/close.svg";

import styles from "./SideMenu.module.scss";

interface SideMenuProps {
  toggleMenu: boolean;
  toggleMenuHandler: () => void;
}

const SideMenu = (props: SideMenuProps) => {
  return (
    <div
      className={`${styles.side_menu} ${
        props.toggleMenu ? styles.toggled : null
      }`}
    >
      <div className={styles.close_btn} onClick={props.toggleMenuHandler}>
        <Close />
      </div>

      <Navigation
        nav_style={styles.hamburger_menu}
        list_style={styles.hamburger_menu_list}
      />
    </div>
  );
};

export default SideMenu;
