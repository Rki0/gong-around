import React, { useMemo, useState } from "react";

import TableHeads from "./TableHeads";
import TableBody from "./TableBody";
import Pagination from "../pagination/Pagination";
import { Feed, TableHead } from "@/types/table";

import styles from "./Table.module.scss";

interface TableProps {
  heads: TableHead[];
  feeds: Feed[];
}

const Table = (props: TableProps) => {
  const { heads, feeds } = props;

  // amount of feeds per page
  const limitPerPage = useMemo(() => {
    return 10;
  }, []);

  // current page number
  const [currentPage, setCurrentPage] = useState(1);

  // first feed index per page
  const offset = useMemo(() => {
    return (currentPage - 1) * limitPerPage;
  }, [currentPage, limitPerPage]);

  // feeds which want to show
  const currentPageFeeds = feeds.slice(offset, offset + limitPerPage);

  // amount of page
  const totalPageNumber = Math.ceil(feeds.length / limitPerPage);

  return (
    <div>
      <table className={styles.table}>
        <TableHeads heads={heads} />

        <TableBody feeds={currentPageFeeds} />
      </table>

      <Pagination
        totalPageNumber={totalPageNumber}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;
