import React from "react";

import SubComment from "./SubComment";
import { SubCommentType } from "@/types/comment.ts";

import styles from "./SubComments.module.scss";

interface SubCommentsProps {
  subComments: SubCommentType[];
}

function SubComments(props: SubCommentsProps) {
  return (
    <div className={styles.subComments_div}>
      {props.subComments.map((subComment) => (
        <SubComment key={subComment._id} subComment={subComment} />
      ))}
    </div>
  );
}

export default SubComments;
