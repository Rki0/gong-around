import React from "react";

import TableHeads from "./TableHeads";
import TableBody from "./TableBody";
import { Feed, TableHead } from "@/types/table";

import styles from "./Table.module.scss";
import { useRouter } from "next/router";

interface TableProps {
  heads: TableHead[];
  feeds: Feed[];
}

const Table = (props: TableProps) => {
  const { heads, feeds } = props;

  const router = useRouter();

  // SUGGEST: If query was changed, React-Query should fetch filtered data.
  // sort는 backend에서 정렬에만 영향을 주기 때문에 분기처리를 할 필요는 없음. 기본값이랑 입력값의 경우만 잘 따지면 됨.
  const optionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: "/community",
      query: {
        ...router.query,
        sort: e.target.value,
      },
    });
  };

  return (
    <div className={styles.table_div}>
      <div className={styles.sort_select}>
        <select name="feed-sort" id="feed-sort" onChange={optionChangeHandler}>
          <option value="date">최신순</option>
          <option value="like">좋아요순</option>
          <option value="view">조회수순</option>
        </select>
      </div>

      <table className={styles.table}>
        <TableHeads heads={heads} />

        <TableBody feeds={feeds} />
      </table>
    </div>
  );
};

export default Table;
