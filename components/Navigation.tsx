import Link from "next/link";
import { useContext } from "react";

import { AuthContext } from "@/context/authContext";
import useLogOutQuery from "@/query/useLogOutQuery";

interface NavigationProps {
  nav_style: string;
  list_style: string;
  onClickHandler: () => void;
}

interface Menu {
  id: number;
  path: string;
  text: string;
}

const NAVIGATION_MENU: Menu[] = [
  {
    id: 1,
    path: "/map",
    text: "지도",
  },
  {
    id: 2,
    path: "/community?page=1",
    text: "커뮤니티",
  },
  {
    id: 3,
    path: "/login",
    text: "로그인/회원가입",
  },
];

const LOGGED_IN_NAVIGATION_MENU: Menu[] = [
  {
    id: 1,
    path: "/map",
    text: "지도",
  },
  {
    id: 2,
    path: "/community?page=1",
    text: "커뮤니티",
  },
  {
    id: 3,
    path: "/feed",
    text: "글쓰기",
  },
  {
    id: 4,
    path: "/mypage",
    text: "마이 페이지",
  },
  {
    id: 5,
    path: "/logout",
    text: "로그아웃",
  },
];

const Navigation = (props: NavigationProps) => {
  const authCtx = useContext(AuthContext);
  const logOutMutation = useLogOutQuery();

  const getNavigationList = (menu: Menu) => {
    if (menu.path === "/logout") {
      return (
        <button type="button" onClick={() => logOutMutation()}>
          {menu.text}
        </button>
      );
    }

    return (
      <Link href={menu.path} onClick={props.onClickHandler}>
        {menu.text}
      </Link>
    );
  };

  const createNavigationMenu = (menuList: Menu[]) => {
    return menuList.map((menu) => (
      <li key={menu.id}>{getNavigationList(menu)}</li>
    ));
  };

  const MENU = authCtx.isLoggedIn
    ? createNavigationMenu(LOGGED_IN_NAVIGATION_MENU)
    : createNavigationMenu(NAVIGATION_MENU);

  return (
    <nav className={props.nav_style}>
      <ul className={props.list_style}>{MENU}</ul>
    </nav>
  );
};

export default Navigation;
