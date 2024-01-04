import React, { useState, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Button from "../button/Button";
import SubComments from "./SubComments";
import SubCommentForm from "@/components/form/SubCommentForm";
import useCreateSubCommentQuery from "@/query/useCreateSubCommentQuery";
import { getElapsedTime } from "@/utils/getElapsedTime";
import { AuthContext } from "@/context/authContext";
import { QUERY_KEY } from "@/query/queryKey";
import useDeleteCommentQuery from "@/query/useDeleteCommentQuery";
import CommentTextarea from "@/components/textArea/CommentTextarea";
import useUpdateCommentQuery from "@/query/useUpdateCommentQuery";
import ThumbsUpIcon from "@/assets/thumbs-up.svg";
import UpIcon from "@/assets/up.svg";
import DownIcon from "@/assets/down.svg";
import DotsVerticalIcon from "@/assets/dots-vertical.svg";

import { CommentType } from "@/types/comment.ts";
import { User } from "@/types/user";

import styles from "./Comment.module.scss";

interface CommentProps {
  comment: CommentType;
}

function Comment(props: CommentProps) {
  const { comment } = props;

  const [isUpdate, setIsUpdate] = useState(false);
  const [showSubComments, setShowSubComments] = useState(false);
  const [text, setText] = useState(comment.description);
  const [isOpenDots, setIsOpenDots] = useState(false);

  // TODO: dots 외부를 클릭했을 때 false로 만들 수 있으면 좋을 것 같은데

  const authCtx = useContext(AuthContext);

  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<User>([QUERY_KEY.USER_INFO]);

  const deleteCommentMutate = useDeleteCommentQuery();
  const updateCommentMutate = useUpdateCommentQuery();
  const subCommentMutate = useCreateSubCommentQuery();

  const toggleUpdate = () => {
    setIsUpdate((prev) => !prev);
    setIsOpenDots(false);
  };

  const deleteHandler = () => {
    if (!authCtx.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    if (!userInfo) {
      return alert("로그인 정보가 없습니다.");
    }

    if (userInfo.userId !== comment.writer._id) {
      return alert("권한이 없는 유저입니다.");
    }

    const isDelete = window.confirm("정말 댓글을 지우시겠습니까?");

    if (!isDelete) {
      return;
    }

    deleteCommentMutate({
      _id: comment._id,
    });
  };

  const updateHandler = () => {
    if (!authCtx.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    if (!userInfo) {
      return alert("로그인 정보가 없습니다.");
    }

    if (userInfo.userId !== comment.writer._id) {
      return alert("권한이 없는 유저입니다.");
    }

    updateCommentMutate({
      description: text,
      _id: comment._id,
    });
  };

  const subCommentsToggleHandler = () => {
    setShowSubComments((prev) => !prev);
  };

  const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onCommentDotsClickHandler = () => {
    setIsOpenDots((prev) => !prev);
  };

  const onLikeClickHandler = () => {
    // TODO: api call to increase/decrease comment like
  };

  return (
    <div className={styles.comment_div}>
      <div className={styles.comment_header}>
        <div className={styles.comment_header_info}>
          <div
            className={
              authCtx.isLoggedIn &&
              userInfo &&
              userInfo.userId === comment.writer._id
                ? styles.comment_header_writer
                : ""
            }
          >
            {comment.writer.nickname}
          </div>
          <div>•</div>
          <div>{getElapsedTime(comment.createdAt, "ko")}</div>
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
            userInfo.userId === comment.writer._id ? (
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
            placeholder={comment.description}
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
        <div>{comment.description}</div>
      )}

      <div className={styles.comment_footer}>
        <div className={styles.comment_like} onClick={onLikeClickHandler}>
          <ThumbsUpIcon />
          {comment.like}
        </div>

        <Button
          type="button"
          onClickHandler={subCommentsToggleHandler}
          style={styles.subComment_summary}
        >
          <span>답글 {comment.subComments.length}개</span>
          <div>{showSubComments ? <UpIcon /> : <DownIcon />}</div>
        </Button>
      </div>

      {showSubComments && (
        <SubCommentForm
          name="subComment"
          textPlaceholder="답글 추가"
          mutate={subCommentMutate}
          parentCommentId={comment._id}
        />
      )}

      {comment.subComments.length !== 0 && showSubComments && (
        <SubComments subComments={comment.subComments} />
      )}
    </div>
  );
}

export default Comment;
