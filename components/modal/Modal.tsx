// reference
// https://stackoverflow.com/questions/77551095/controlling-modal-using-custom-hook-does-not-work-properly

import React from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.JSX.Element | React.JSX.Element[];
  closeHandler: () => void;
}

function Modal(props: ModalProps) {
  const content = (
    <>
      <div className={styles.backdrop} onClick={props.closeHandler}></div>
      <div className={styles.modal_body}>
        <div>{props.children}</div>
      </div>
    </>
  );

  return createPortal(content, document.getElementById("modal") as HTMLElement);
}

export default Modal;
