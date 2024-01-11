import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: any;
  onClickHandler?: () => void;
  style?: any;
}

function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      onClick={props.onClickHandler}
      className={props.style}
    >
      {props.children}
    </button>
  );
}

export default Button;
