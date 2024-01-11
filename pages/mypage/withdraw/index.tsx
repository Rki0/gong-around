import React, { useState } from "react";

import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";

import styles from "./index.module.scss";

function WithdrawPage() {
  const [password, setPassword] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { isOpenModal, openModal, closeModal } = useModal();

  const modalOpenHandler = () => {
    openModal();
  };

  const modalCloseHandler = () => {
    closeModal();
  };

  const withdrawHandler = () => {
    // TODO: progress withdraw
    console.log("withdraw...");
    closeModal();
  };

  return (
    <section className={styles.section}>
      {isOpenModal && (
        <Modal closeHandler={modalCloseHandler}>
          <h1>정말 탈퇴하시겠어요?</h1>

          <button type="button" onClick={withdrawHandler}>
            확인
          </button>
          <button type="button" onClick={closeModal}>
            취소
          </button>
        </Modal>
      )}

      <h1>회원 탈퇴</h1>

      <p>탈퇴를 원하시면 비밀번호를 입력해주세요.</p>

      <input
        type="password"
        value={password}
        onChange={onChangeHandler}
        required
      />

      <button type="button" onClick={modalOpenHandler}>
        탈퇴하기
      </button>
    </section>
  );
}

export default WithdrawPage;
