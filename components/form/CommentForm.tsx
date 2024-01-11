import React, { useContext, useState } from "react";
import { UseMutateFunction } from "@tanstack/react-query";

import CommentTextarea from "../textArea/CommentTextarea";
import Button from "../button/Button";
import { AuthContext } from "@/context/authContext";

import { PostedComment, PostedSubComment } from "@/types/comment";

import styles from "./CommentForm.module.scss";

interface CommentFormProps {
  name: string;
  textPlaceholder: string;
  mutate: UseMutateFunction<void, Error, PostedComment, unknown>;
}

function CommentForm(props: CommentFormProps) {
  const [commentText, setCommentText] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const authCtx = useContext(AuthContext);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authCtx.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    props.mutate({
      description: commentText,
    });

    setCommentText("");
  };

  return (
    <form
      className={styles.comment_form}
      name={props.name}
      onSubmit={submitHandler}
    >
      <CommentTextarea
        placeholder={props.textPlaceholder}
        value={commentText}
        onChangeHandler={onChangeHandler}
        name={props.name}
      />

      <hr className={styles.hr} />

      <div className={styles.btn_div}>
        <Button type="submit">등록</Button>
      </div>
    </form>
  );
}

export default CommentForm;
