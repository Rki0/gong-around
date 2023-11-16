import React from "react";

import TableHeads from "./TableHeads";
import TableBody from "./TableBody";
import { Feed, TableHead } from "@/types/table";

import styles from "./Table.module.scss";

interface TableProps {
  heads: TableHead[];
  feeds: Feed[];
}

const Table = (props: TableProps) => {
  const { heads, feeds } = props;

  return (
    <table className={styles.table}>
      <TableHeads heads={heads} />

      <TableBody feeds={feeds} />
    </table>
  );
};

export default Table;
