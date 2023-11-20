import Table from "@/components/table/Table";
import Quote from "@/assets/quote.svg";
import { Feed, TableHead } from "@/types/table.ts";

import styles from "./index.module.scss";

export interface CommunityPageProps {
  feeds: Feed[];
}

const TABLE_HEADS: TableHead[] = [
  {
    id: 1,
    name: "제목",
  },
  {
    id: 2,
    name: "날짜",
  },
  {
    id: 3,
    name: "좋아요",
  },
  {
    id: 4,
    name: "조회수",
  },
];

const CommunityPage = (props: CommunityPageProps) => {
  const { feeds } = props;

  return (
    <section className={styles.section}>
      <h1>
        <span>커뮤니티</span>

        <Quote />
      </h1>

      <Table heads={TABLE_HEADS} feeds={feeds} />
    </section>
  );
};

export default CommunityPage;

export async function getStaticProps() {
  const feeds = [
    {
      id: 1,
      title: "김포공항 좋네요",
      date: "2023.11.16",
      like: 0,
      view: 0,
    },
    {
      id: 2,
      title: "인천공항 좋네요",
      date: "2023.11.17",
      like: 0,
      view: 0,
    },
    {
      id: 3,
      title: "나리타공항 좋네요",
      date: "2023.11.18",
      like: 0,
      view: 0,
    },
    {
      id: 4,
      title: "하네다공항 좋네요",
      date: "2023.11.19",
      like: 0,
      view: 0,
    },
    {
      id: 5,
      title: "김포공항 좋네요",
      date: "2023.11.20",
      like: 0,
      view: 0,
    },
    {
      id: 6,
      title: "인천공항 좋네요",
      date: "2023.11.21",
      like: 0,
      view: 0,
    },
    {
      id: 7,
      title: "나리타공항 좋네요",
      date: "2023.11.22",
      like: 0,
      view: 0,
    },
    {
      id: 8,
      title: "하네다공항 좋네요",
      date: "2023.11.23",
      like: 0,
      view: 0,
    },
    {
      id: 9,
      title: "김포공항 좋네요",
      date: "2023.11.24",
      like: 0,
      view: 0,
    },
    {
      id: 10,
      title: "인천공항 좋네요",
      date: "2023.11.25",
      like: 0,
      view: 0,
    },
    {
      id: 11,
      title: "나리타공항 좋네요",
      date: "2023.11.26",
      like: 0,
      view: 0,
    },
    {
      id: 12,
      title: "하네다공항 좋네요",
      date: "2023.11.27",
      like: 0,
      view: 0,
    },
  ];

  const repeat = (arr: any, n: number) => new Array(n).fill(arr).flat();

  return {
    props: {
      // feeds: feeds,
      feeds: repeat(feeds, 12),
    },
    revalidate: 10,
  };
}
