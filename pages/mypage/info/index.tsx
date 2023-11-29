import React, { useReducer } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import LabeledPasswordInput from "../../../components/input/LabeledPasswordInput";
import useModal from "../../../hooks/useModal";
import Modal from "../../../components/modal/Modal";
import Edit from "@/assets/edit.svg";

import styles from "./index.module.scss";

interface MyInfoPageProps {
  nickname: string;
  profileImage: string;
}

interface InitialState {
  [key: string]: any;
  newNickname: string;
  newProfileImage: null | File;
  previewImage: string;
  password: string;
  newPassword: string;
  checkNewPassword: string;
}

interface Action {
  type: string;
  target: string;
  payload: string | File;
}

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.target]: action.payload,
      };

    default:
      return state;
  }
};

function MyInfoPage(props: MyInfoPageProps) {
  const [formState, dispatch] = useReducer(reducer, {
    newNickname: props.nickname,
    newProfileImage: null,
    previewImage: props.profileImage,
    password: "",
    newPassword: "",
    checkNewPassword: "",
  });

  const router = useRouter();
  const { isOpenModal, openModal, closeModal } = useModal();

  const nicknameInputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "CHANGE_INPUT",
      target: "newNickname",
      payload: e.target.value,
    });
  };

  const imageFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch({
        type: "CHANGE_INPUT",
        target: "previewImage",
        payload: reader.result as string,
      });

      dispatch({
        type: "CHANGE_INPUT",
        target: "newProfileImage",
        payload: file,
      });
    };
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_INPUT",
      target: "password",
      payload: e.target.value,
    });
  };

  const newPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_INPUT",
      target: "newPassword",
      payload: e.target.value,
    });
  };

  const checkNewPasswordChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "CHANGE_INPUT",
      target: "checkNewPassword",
      payload: e.target.value,
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formState);
  };

  const cancelClickHandler = () => {
    openModal();
  };

  const pageBackHandler = () => {
    closeModal();
    router.back();
  };

  return (
    <section className={styles.section}>
      {isOpenModal && (
        <Modal closeHandler={closeModal}>
          <h1>변경 내용이 전부 사라집니다. 정말 취소하시겠습니까?</h1>

          <div>
            <button onClick={pageBackHandler}>네</button>
            <button onClick={closeModal}>아니오</button>
          </div>
        </Modal>
      )}

      <h1>개인 정보 수정</h1>

      <form onSubmit={onSubmitHandler}>
        <div>
          <div>
            <Image
              src={formState.previewImage}
              alt="profile"
              width={300}
              height={300}
            />

            <label htmlFor="profileIamge">
              <span>이미지 변경하기</span>
              <Edit />
            </label>
            <input
              id="profileIamge"
              type="file"
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              onChange={imageFileChangeHandler}
            />
          </div>

          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              value={formState.newNickname}
              onChange={nicknameInputChangeHandler}
            />
          </div>
        </div>

        <div>
          <LabeledPasswordInput
            id="password"
            labelText="현재 비밀번호"
            onChangeHandler={passwordChangeHandler}
          />

          <LabeledPasswordInput
            id="newPassword"
            labelText="새 비밀번호"
            onChangeHandler={newPasswordChangeHandler}
          />

          <LabeledPasswordInput
            id="checkNewPassword"
            labelText="새 비밀번호 확인"
            onChangeHandler={checkNewPasswordChangeHandler}
          />
        </div>

        <div>
          <button type="submit">완료</button>
          <button type="button" onClick={cancelClickHandler}>
            취소
          </button>
        </div>
      </form>
    </section>
  );
}

export default MyInfoPage;

export async function getStaticProps() {
  // API call to get user information(profile image, nickname)

  // const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND}/user`);
  // const data = await response.json();

  return {
    props: {
      nickname: "Rki0",
      profileImage:
        "https://images.unsplash.com/photo-1642456074142-92f75cb84533?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  };
}
