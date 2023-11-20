import React, { useEffect, useState } from "react";

import { InputProps } from "@/types/input";

import styles from "./Input.module.scss";

function TextInput(props: InputProps) {
  const { label, target, onInput } = props;

  const [inputState, setInputState] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  useEffect(() => {
    onInput(target, inputState);
  }, [inputState, onInput, target]);

  return (
    <div>
      <label htmlFor={target} className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        id={target}
        className={styles.input}
        value={inputState}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default TextInput;
