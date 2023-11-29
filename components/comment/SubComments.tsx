import React from "react";

import SubComment from "./SubComment";
import { CommentType } from "@/types/comment.ts";

interface SubCommentsProps {
  comments: CommentType[];
}

function SubComments(props: SubCommentsProps) {
  return (
    <div>
      {props.comments.map((subComment) => (
        <SubComment key={subComment.id} subComment={subComment} />
      ))}
    </div>
  );
}

export default SubComments;
