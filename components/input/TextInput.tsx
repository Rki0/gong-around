import React, { useEffect, useState } from "react";

import { InputProps } from "@/types/input";

import styles from "./TextInput.module.scss";

function TextInput(props: InputProps) {
  const { label, target, onInput, required } = props;

  const [inputState, setInputState] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  useEffect(() => {
    onInput(target, inputState);
  }, [inputState, onInput, target]);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={target} className={styles.label}>
        {label}

        {required && <span>*</span>}
      </label>
      <input
        type="text"
        id={target}
        className={styles.input}
        value={inputState}
        onChange={onChangeHandler}
        required={required}
      />
    </div>
  );
}

export default TextInput;
