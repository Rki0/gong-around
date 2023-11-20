import React, { useEffect, useState } from "react";

import { InputProps } from "@/types/input";

import styles from "./Input.module.scss";

function FileInput(props: InputProps) {
  const { label, target, onInput } = props;

  const [inputState, setInputState] = useState<File[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    let pickedFiles = [];

    for (let i = 0; i < e.target.files.length; i++) {
      pickedFiles.push(e.target.files[i]);
    }

    setInputState([...inputState, ...pickedFiles]);
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
        type="file"
        id={target}
        className={styles.input}
        onChange={onChangeHandler}
        multiple
        accept=".jpg, .jpeg, .png"
      />
    </div>
  );
}

export default FileInput;
