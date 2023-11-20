import React, { useMemo, useState } from "react";

import ArrowButton from "./ArrowButton";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPageNumber: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

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
    // if you use only currentPagination, it will change offset when pagination is 10.
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
    <div>
      <ArrowButton direction="left" onClickHandler={backwardClickHandler} />

      <ol className={styles.list_body}>
        {showingPagination.map((page, index) => (
          <li key={index} onClick={() => pageClickHandler(page)}>
            {page}
          </li>
        ))}
      </ol>

      <ArrowButton direction="right" onClickHandler={forwardClickHandler} />
    </div>
  );
}

export default Pagination;
