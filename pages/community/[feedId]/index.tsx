import React from "react";

import styles from "./index.module.scss";

function FeedDetailPage() {
  return (
    <section className={styles.section}>
      <div>
        <div>제목</div>
        <div>날짜</div>
        <div>위치</div>
        <div>작성자</div>
      </div>

      <div>{/* slide img */}</div>

      <div>{/* map with marker */}</div>

      <div>{/* comments */}</div>
    </section>
  );
}

export default FeedDetailPage;

// export async function getStaticProps() {}

// export async function getStaticPaths() {}
