import React from "react";
import { useRouter } from "next/router";

import ArrowButton from "./ArrowButton";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  paginationStartNum: number;
  paginationEndNum: number;
  totalPageNum: number;
  hasMore: boolean;
}

function Pagination(props: PaginationProps) {
  const { paginationStartNum, paginationEndNum, totalPageNum, hasMore } = props;

  const router = useRouter();
  const currentPage = parseInt(router.query.page as string, 10);

  const paginationArr = Array.from(
    { length: paginationEndNum - paginationStartNum + 1 },
    (_, i) => paginationStartNum + i
  );

  const pageClickHandler = (page: number) => {
    router.push({
      pathname: "/community",
      query: {
        page,
      },
    });
  };

  const backwardClickHandler = () => {
    if (currentPage === 1) {
      return;
    }

    router.push({
      pathname: "/community",
      query: {
        page: currentPage - 1,
      },
    });
  };

  const forwardClickHandler = () => {
    if (currentPage === totalPageNum) {
      return;
    }

    if (!hasMore) {
      return;
    }

    router.push({
      pathname: "/community",
      query: {
        page: currentPage + 1,
      },
    });
  };

  return (
    <div className={styles.pagination}>
      <ArrowButton direction="left" onClickHandler={backwardClickHandler} />

      <ol className={styles.list_body}>
        {paginationArr.map((page, index) => (
          <li
            key={index}
            onClick={() => pageClickHandler(page)}
            className={`${styles.list_item} ${
              currentPage === page ? styles.activated_page : undefined
            }`}
          >
            {page}
          </li>
        ))}
      </ol>

      <ArrowButton direction="right" onClickHandler={forwardClickHandler} />
    </div>
  );
}

export default Pagination;
