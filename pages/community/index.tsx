import styles from "./index.module.scss";

const DUMMY_FEEDS = [
  {
    id: Math.random(),
    title: "김포공항 좋네요",
    date: new Date().toLocaleDateString("ko-KR"),
    like: 0,
    view: 0,
  },
  {
    id: Math.random(),
    title: "인천공항 좋네요",
    date: new Date().toLocaleDateString("ko-KR"),
    like: 0,
    view: 0,
  },
  {
    id: Math.random(),
    title: "나리타공항 좋네요",
    date: new Date().toLocaleDateString("ko-KR"),
    like: 0,
    view: 0,
  },
  {
    id: Math.random(),
    title: "하네다공항 좋네요",
    date: new Date().toLocaleDateString("ko-KR"),
    like: 0,
    view: 0,
  },
];

const CommunityPage = () => {
  return (
    <section className={styles.section}>
      <h1>Community</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>제목</th>
            <th>날짜</th>
            <th>좋아요</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {DUMMY_FEEDS.map((feed) => (
            <tr key={feed.id}>
              <td>{feed.title}</td>
              <td>{feed.date}</td>
              <td>{feed.like}</td>
              <td>{feed.view}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CommunityPage;
