import React from "react";

import Left from "@/assets/left.svg";
import Right from "@/assets/right.svg";

import styles from "./ArrowButton.module.scss";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClickHandler: () => void;
}

function ArrowButton(props: ArrowButtonProps) {
  const { direction, onClickHandler } = props;

  const arrow = direction === "left" ? <Left /> : <Right />;

  return (
    <div onClick={onClickHandler} className={styles.div}>
      <button className={styles.button}>{arrow}</button>
    </div>
  );
}

export default ArrowButton;
