import styles from "./SideMenuBackground.module.scss";

interface SideMenuBgProps {
  toggleMenu: boolean;
  toggleMenuHandler: () => void;
}

const SideMenuBackground = (props: SideMenuBgProps) => {
  return (
    <div
      className={`${styles.side_menu_background} ${
        props.toggleMenu ? styles.toggled : null
      }`}
      onClick={props.toggleMenuHandler}
    ></div>
  );
};

export default SideMenuBackground;
