import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: string;
}

function Button(props: ButtonProps) {
  return <button type={props.type}>{props.children}</button>;
}

export default Button;
