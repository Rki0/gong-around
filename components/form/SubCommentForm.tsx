import React, { useContext, useState } from "react";
import { UseMutateFunction } from "@tanstack/react-query";

import CommentTextarea from "../textArea/CommentTextarea";
import Button from "../button/Button";
import { AuthContext } from "@/context/authContext";

import { PostedSubComment } from "@/types/comment";

import styles from "./SubCommentForm.module.scss";

interface SubCommentFormProps {
  name: string;
  textPlaceholder: string;
  mutate: UseMutateFunction<void, Error, PostedSubComment, unknown>;
  parentCommentId: string;
}

function SubCommentForm(props: SubCommentFormProps) {
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
      parentCommentId: props.parentCommentId,
    });

    setCommentText("");
  };

  return (
    <form
      className={styles.subComment_form}
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

export default SubCommentForm;
