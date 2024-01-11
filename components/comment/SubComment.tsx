import React, { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { getElapsedTime } from "@/utils/getElapsedTime";
import useDeleteSubCommentQuery from "@/query/useDeleteSubCommentQuery";
import { AuthContext } from "@/context/authContext";
import { QUERY_KEY } from "@/query/queryKey";
import useUpdateSubCommentQuery from "@/query/useUpdateSubCommentQuery";
import CommentTextarea from "@/components/textArea/CommentTextarea";
import ThumbsUpIcon from "@/assets/thumbs-up.svg";
import DotsVerticalIcon from "@/assets/dots-vertical.svg";

import { SubCommentType } from "@/types/comment.ts";
import { User } from "@/types/user";

import styles from "./SubComment.module.scss";

interface SubCommentProps {
  subComment: SubCommentType;
}

function SubComment(props: SubCommentProps) {
  const { subComment } = props;

  const [isUpdate, setIsUpdate] = useState(false);
  const [text, setText] = useState(props.subComment.description);
  const [isOpenDots, setIsOpenDots] = useState(false);

  const authCtx = useContext(AuthContext);

  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<User>([QUERY_KEY.USER_INFO]);

  const deleteSubCommentMutate = useDeleteSubCommentQuery();
  const updateSubCommentMutate = useUpdateSubCommentQuery();

  const deleteHandler = () => {
    if (!authCtx.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    if (!userInfo) {
      return alert("로그인 정보가 없습니다.");
    }

    if (userInfo.userId !== props.subComment.writer._id) {
      return alert("권한이 없는 유저입니다.");
    }

    const isDelete = window.confirm("정말 답글을 지우시겠습니까?");

    if (!isDelete) {
      return;
    }

    deleteSubCommentMutate({
      _id: subComment._id,
      parentCommentId: subComment.parentComment,
    });
  };

  const toggleUpdate = () => {
    setIsUpdate((prev) => !prev);
    setIsOpenDots(false);
  };

  const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const updateHandler = () => {
    if (!authCtx.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    if (!userInfo) {
      return alert("로그인 정보가 없습니다.");
    }

    if (userInfo.userId !== props.subComment.writer._id) {
      return alert("권한이 없는 유저입니다.");
    }

    updateSubCommentMutate({
      _id: subComment._id,
      parentCommentId: subComment.parentComment,
      description: text,
    });

    toggleUpdate();
  };

  const onCommentDotsClickHandler = () => {
    setIsOpenDots((prev) => !prev);
  };

  const onLikeClickHandler = () => {
    // TODO: api call to increase/decrease subComment like
  };

  return (
    <div className={styles.comment_div}>
      <div className={styles.comment_header}>
        <div className={styles.comment_header_info}>
          <div
            className={
              authCtx.isLoggedIn &&
              userInfo &&
              userInfo.userId === subComment.writer._id
                ? styles.comment_header_writer
                : ""
            }
          >
            {subComment.writer.nickname}
          </div>
          <div>•</div>
          <div>{getElapsedTime(subComment.createdAt, "ko")}</div>
        </div>

        <div className={styles.comment_header_options}>
          <div
            className={styles.comment_header_dots}
            onClick={onCommentDotsClickHandler}
          >
            <DotsVerticalIcon />
          </div>

          {isOpenDots ? (
            authCtx.isLoggedIn &&
            userInfo &&
            userInfo.userId === subComment.writer._id ? (
              <div className={styles.dots_options}>
                <button type="button" onClick={deleteHandler}>
                  삭제
                </button>

                <button type="button" onClick={toggleUpdate}>
                  수정
                </button>
              </div>
            ) : (
              <div>신고?</div>
            )
          ) : null}
        </div>
      </div>

      {isUpdate ? (
        <div className={styles.update_comment_div}>
          <CommentTextarea
            placeholder={subComment.description}
            value={text}
            onChangeHandler={textChangeHandler}
            name="subComment"
          />

          <hr className={styles.hr} />

          <div className={styles.update_comment_btns}>
            <button type="button" onClick={toggleUpdate}>
              취소
            </button>
            <button type="button" onClick={updateHandler}>
              등록
            </button>
          </div>
        </div>
      ) : (
        <div>{subComment.description}</div>
      )}

      <div className={styles.comment_like} onClick={onLikeClickHandler}>
        <ThumbsUpIcon />
        {subComment.like}
      </div>
    </div>
  );
}

export default SubComment;
