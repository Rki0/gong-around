import React from "react";

import Left from "@/assets/left.svg";
import Right from "@/assets/right.svg";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClickHandler: () => void;
}

function ArrowButton(props: ArrowButtonProps) {
  const { direction, onClickHandler } = props;

  const arrow = direction === "left" ? <Left /> : <Right />;

  return (
    // TODO: disabled when page number is 1 (left)
    // TODO: disabled when page number is maximum (right)
    <button onClick={onClickHandler}>{arrow}</button>
  );
}

export default ArrowButton;
