import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: any;
  onClickHandler?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <button type={props.type} onClick={props.onClickHandler}>
      {props.children}
    </button>
  );
}

export default Button;
