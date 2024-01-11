import React, { useEffect, useState } from "react";

import { getTodayDate } from "@/utils/getTodayDate";
import { InputProps } from "@/types/input";

import styles from "./DateInput.module.scss";

function DateInput(props: InputProps) {
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
        type="date"
        id={target}
        className={styles.input}
        value={inputState}
        onChange={onChangeHandler}
        required={required}
        max={getTodayDate()}
      />
    </div>
  );
}

export default DateInput;
