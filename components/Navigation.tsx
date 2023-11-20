import Link from "next/link";

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

// TODO: implement condition to show element after id 4 to only logged-in user
const NAVIGATION_MENU: Menu[] = [
  {
    id: 1,
    path: "/map",
    text: "지도",
  },
  {
    id: 2,
    path: "/community",
    text: "커뮤니티",
  },
  {
    id: 3,
    path: "/mypage",
    text: "마이 페이지",
  },
  {
    id: 4,
    path: "/login",
    text: "로그인/회원가입",
  },
  {
    id: 5,
    path: "/feed",
    text: "글쓰기",
  },
];

const Navigation = (props: NavigationProps) => {
  return (
    <nav className={props.nav_style}>
      <ul className={props.list_style}>
        {NAVIGATION_MENU.map((menu) => (
          <Link key={menu.id} href={menu.path} onClick={props.onClickHandler}>
            {menu.text}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
