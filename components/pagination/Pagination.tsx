import React, { useMemo, useState } from "react";

import ArrowButton from "./ArrowButton";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPageNumber: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

// FIXME: 한 페이지에 게시물이 10개가 아니라면 UI가 위아래로 줄어드는 문제
// FIXME: 상세 페이지에 들어갔다가 나오면 페이지네이션이 1로 초기화되는 문제(페이지네이션을 프론트에서 처리해서 그런 것.)
function Pagination(props: PaginationProps) {
  const { totalPageNumber, setCurrentPage, currentPage } = props;

  // showing amount of pagination at once
  const limitPaginationAmount = useMemo(() => {
    return 10;
  }, []);

  // current selected pagination
  const [currentPagination, setCurrentPagination] = useState(1);

  // pagination array
  const paginationArray = Array.from({ length: totalPageNumber })
    .fill(0)
    .map((_, index) => index + 1);

  // start index of pagination
  const offset = useMemo(() => {
    // why currentPagination - 1 ?
    // if you use just currentPagination, it will change offset when pagination is 10.
    return (
      Math.floor((currentPagination - 1) / limitPaginationAmount) *
      limitPaginationAmount
    );
  }, [currentPagination, limitPaginationAmount]);

  // current showing pagination
  const showingPagination = paginationArray.slice(
    offset,
    offset + limitPaginationAmount
  );

  const pageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  const backwardClickHandler = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPagination((prev) => prev - 1);
    setCurrentPage((prev) => prev - 1);
  };

  const forwardClickHandler = () => {
    if (currentPage === totalPageNumber) {
      return;
    }

    setCurrentPagination((prev) => prev + 1);
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className={styles.pagination}>
      <ArrowButton direction="left" onClickHandler={backwardClickHandler} />

      <ol className={styles.list_body}>
        {showingPagination.map((page, index) => (
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
