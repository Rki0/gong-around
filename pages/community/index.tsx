import { useState } from "react";
import { useRouter } from "next/router";

import Table from "@/components/table/Table";
import Quote from "@/assets/quote.svg";
import Pagination from "@/components/pagination/Pagination";
import SearchIcon from "@/assets/search.svg";

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
    name: "날짜", // SUGGEST: 여행을 간 날짜가 중요하지, 게시물을 올린 날짜가 중요한건 아닌 것 같은데...
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

const SELECT_OPTIONS = [
  {
    id: 1,
    name: "최신 순",
  },
  {
    id: 2,
    name: "좋아요 순",
  },
  {
    id: 3,
    name: "조회수 순",
  },
];

const CommunityPage = (props: any) => {
  const { feeds } = props;
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput === "") {
      const currentSort = router.query.sort;

      router.push({
        pathname: "/community",
        query: {
          page: router.query.page as string,
          sort: currentSort,
        },
      });

      return;
    }

    router.push({
      pathname: "/community",
      query: {
        ...router.query,
        keyword: searchInput,
      },
    });
  };

  return (
    <section className={styles.section}>
      <h1>
        <span>커뮤니티</span>

        <Quote />
      </h1>

      <form onSubmit={onSubmitHandler} className={styles.search_bar}>
        <input
          value={searchInput}
          onChange={onChangeHandler}
          placeholder="제목을 검색해보세요."
        />

        <button type="submit">
          <SearchIcon />
        </button>
      </form>

      <Table heads={TABLE_HEADS} feeds={feeds.currentPageFeeds} />

      <Pagination
        hasMore={feeds.hasMore}
        paginationEndNum={feeds.paginationEndNum}
        paginationStartNum={feeds.paginationStartNum}
        totalPageNum={feeds.totalPageNum}
      />
    </section>
  );
};

export default CommunityPage;

export async function getServerSideProps(context: any) {
  const page = parseInt(context.query.page, 10);
  const keyword = context.query.keyword;
  const sort = context.query.sort;

  let response;

  if (!keyword) {
    response = await fetch(
      `http://localhost:5000/api/feed/pagination?page=${page}&sort=${sort}`
    );
  } else {
    response = await fetch(
      `http://localhost:5000/api/feed/pagination?page=${page}&sort=${sort}&keyword=${keyword}`
    );
  }

  const data = await response.json();

  return {
    props: {
      feeds: data,
    },
  };
}
