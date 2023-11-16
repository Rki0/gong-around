import React from "react";

import { TableHead } from "@/types/table";

interface TableHeadProps {
  heads: TableHead[];
}

function TableHeads(props: TableHeadProps) {
  const { heads } = props;

  return (
    <thead>
      <tr>
        {heads.map((head) => (
          <th key={head.id}>{head.name}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeads;
