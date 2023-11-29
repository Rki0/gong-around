import React from "react";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  length: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  setTransition: React.Dispatch<React.SetStateAction<string>>;
}

function Pagination(props: PaginationProps) {
  const { length, setSlideIndex, setTransition } = props;

  const slideNavigation = Array.from({ length })
    .fill(0)
    .map((_, index) => index + 1);

  const onClickHandler = (clickedSlide: number) => {
    setSlideIndex(clickedSlide);
    setTransition("all 500ms ease-in-out");
  };

  return (
    <ol className={styles.ol}>
      {slideNavigation.map((slideNav) => (
        <li
          key={slideNav}
          className={styles.nav}
          onClick={() => onClickHandler(slideNav)}
        >
          {slideNav}
        </li>
      ))}
    </ol>
  );
}

export default Pagination;
