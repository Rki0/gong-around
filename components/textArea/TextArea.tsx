import React, { useState, useEffect } from "react";

import { InputProps } from "@/types/input";

import styles from "./TextArea.module.scss";

const MAX_BYTE = 3000;

function TextArea(props: InputProps) {
  const { label, target, onInput, required } = props;

  const [inputState, setInputState] = useState("");
  const [textByte, setTextByte] = useState(0);
  const [isByteOver, setIsByteOver] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputState(e.target.value);
  };

  useEffect(() => {
    onInput(target, inputState);
  }, [inputState, onInput, target]);

  useEffect(() => {
    const encoder = new TextEncoder();
    const encodedString = encoder.encode(inputState);
    setTextByte(encodedString.length);
  }, [inputState]);

  useEffect(() => {
    if (textByte > MAX_BYTE) {
      setIsByteOver(true);
      return;
    }

    setIsByteOver(false);
  }, [textByte]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}

        {required && <span>*</span>}
      </label>

      <div className={styles.textarea_div}>
        <textarea
          className={styles.textarea}
          placeholder="내용을 입력해주세요."
          value={inputState}
          onChange={onChangeHandler}
          required={required}
        />

        <div className={`${isByteOver ? styles.byte_warn : ""} ${styles.byte}`}>
          {textByte}/{MAX_BYTE} byte
        </div>
      </div>
    </div>
  );
}

export default TextArea;
