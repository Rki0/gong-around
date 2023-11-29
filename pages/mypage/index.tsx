import React from "react";
import Link from "next/link";

import styles from "./index.module.scss";

const myPageArray = [
  {
    id: 1,
    title: "개인 정보 변경",
    path: "/mypage/info",
  },
  {
    id: 2,
    title: "좋아요 누른 게시물",
    path: "/mypage/like",
  },
  {
    id: 3,
    title: "회원 탈퇴",
    path: "/mypage/withdraw",
  },
];

function MyPage() {
  return (
    <section className={styles.section}>
      <h1>마이 페이지</h1>

      <ul>
        {myPageArray.map((content) => (
          <li key={content.id}>
            <Link href={content.path}>{content.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MyPage;
