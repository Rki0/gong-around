import React, { useState } from "react";

import CommentTextarea from "../textArea/CommentTextarea";
import Button from "../button/Button";

interface CommentFormProps {
  name: string;
  textPlaceholder: string;
}

function CommentForm(props: CommentFormProps) {
  const [commentText, setCommentText] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  // TODO: add API call to post comment/subcomment data
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(commentText);

    setCommentText("");
  };

  return (
    <form name={props.name} onSubmit={submitHandler}>
      <CommentTextarea
        placeholder={props.textPlaceholder}
        value={commentText}
        onChangeHandler={onChangeHandler}
        name={props.name}
      />

      <Button type="submit">등록</Button>
    </form>
  );
}

export default CommentForm;
