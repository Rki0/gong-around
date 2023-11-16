import Link from "next/link";

interface NavigationProps {
  nav_style: string;
  list_style: string;
}

const Navigation = (props: NavigationProps) => {
  return (
    <nav className={props.nav_style}>
      <ul className={props.list_style}>
        <Link href="/map">지도</Link>
        <Link href="/community">커뮤니티</Link>
        <Link href="/mypage">마이 페이지</Link>
        <Link href="/login">로그인/회원가입</Link>
      </ul>
    </nav>
  );
};

export default Navigation;
