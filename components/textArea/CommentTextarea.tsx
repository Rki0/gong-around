import React, { useState } from "react";

interface CommentTextareaProps {
  placeholder: string;
  value: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
}

function CommentTextarea(props: CommentTextareaProps) {
  return (
    <>
      <textarea
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChangeHandler}
        name={props.name}
      />
    </>
  );
}

export default CommentTextarea;
