import React from "react";

import Comment from "./Comment";
import { CommentType } from "@/types/comment.ts";

interface CommentsProps {
  comments: CommentType[];
}

function Comments(props: CommentsProps) {
  const { comments } = props;

  if (comments.length === 0) {
    return (
      <div>
        <p>댓글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      {props.comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
