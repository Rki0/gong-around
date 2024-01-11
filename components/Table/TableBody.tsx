import React from "react";
import { useRouter } from "next/router";

import { Feed } from "@/types/table";

interface TableBodyProps {
  feeds: Feed[];
}

function TableBody(props: TableBodyProps) {
  const { feeds } = props;

  const router = useRouter();

  const tableRowClickHandler = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    const targetRow = (e.target as HTMLElement).closest("tr");

    if (!targetRow) {
      return;
    }

    router.push({
      pathname: `/community/[feedId]`,
      query: {
        feedId: targetRow.getAttribute("data-id"),
      },
    });
  };

  return (
    <tbody>
      {feeds.map((feed) => (
        <tr key={feed._id} data-id={feed._id} onClick={tableRowClickHandler}>
          <td>
            <p>{feed.title}</p>({feed.commentsCount + feed.subCommentsCount})
          </td>
          <td>{feed.createdAt.split("T")[0]}</td>
          <td>{feed.like}</td>
          <td>{feed.view}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
