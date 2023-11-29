import React from "react";

import { CommentType } from "@/types/comment.ts";

interface SubCommentProps {
  subComment: CommentType;
}

function SubComment(props: SubCommentProps) {
  const { subComment } = props;

  return (
    <div>
      <div>{subComment.writer}</div>
      <div>{subComment.content}</div>
      <div>{subComment.like}</div>
    </div>
  );
}

export default SubComment;
