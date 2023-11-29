import React from "react";

import Comment from "./Comment";
import { Comment as CommentInterface } from "@/types/comment.ts";

interface CommentsProps {
  comments: CommentInterface[];
}

function Comments(props: CommentsProps) {
  return (
    <div>
      {props.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
