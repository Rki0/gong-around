import React, { useState } from "react";

import Button from "../button/Button";
import SubComments from "./SubComments";
import CommentTextarea from "../textArea/CommentTextarea";
import CommentForm from "../form/CommentForm";

import { Comment as CommentType } from "@/types/comment.ts";

interface CommentProps {
  comment: CommentType;
}

function Comment(props: CommentProps) {
  const { comment } = props;

  const [showSubComments, setShowSubComments] = useState(false);

  const subCommentsToggleHandler = () => {
    setShowSubComments((prev) => !prev);
  };

  return (
    <div>
      <div>{comment.writer}</div>
      <div>{comment.content}</div>
      <div>{comment.like}</div>

      {comment.sub_comments.length !== 0 && (
        <Button type="button" onClickHandler={subCommentsToggleHandler}>
          답글 {comment.sub_comments.length}개
        </Button>
      )}

      {showSubComments && (
        <CommentForm name="subComment" textPlaceholder="답글 추가" />
      )}

      {comment.sub_comments.length !== 0 && showSubComments && (
        <SubComments comments={comment.sub_comments} />
      )}
    </div>
  );
}

export default Comment;
