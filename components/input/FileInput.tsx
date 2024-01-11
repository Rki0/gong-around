import React, { useEffect, useState } from "react";

import BackspaceIcon from "@/assets/backspace.svg";

import { InputProps } from "@/types/input";

import styles from "./FileInput.module.scss";

function FileInput(props: InputProps) {
  const { label, target, onInput } = props;

  const [inputState, setInputState] = useState<File[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    if (inputState.length + e.target.files.length > 5) {
      return alert("파일 개수는 최대 5개까지 가능합니다.");
    }

    const existingFileSet = new Set(
      inputState.map((file) => `${file.name}-${file.size}`)
    );

    let isDuplicated = false;

    for (const newFile of e.target.files) {
      const key = `${newFile.name}-${newFile.size}`;

      if (existingFileSet.has(key)) {
        isDuplicated = true;
      }
    }

    if (isDuplicated) {
      return alert("이미 등록된 파일입니다.");
    }

    let pickedFiles = [];

    for (let i = 0; i < e.target.files.length; i++) {
      pickedFiles.push(e.target.files[i]);
    }

    setInputState([...inputState, ...pickedFiles]);
  };

  const onFileDeleteHandler = (targetIndex: number) => {
    setInputState(inputState.filter((_, index) => index !== targetIndex));
  };

  useEffect(() => {
    onInput(target, inputState);
  }, [inputState, onInput, target]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.input_wrapper}>
        <label htmlFor={target} className={styles.label}>
          {label}
        </label>

        <label htmlFor={target} className={styles.file_btn}>
          첨부하기
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

      <ol>
        {inputState.map((file, index) => (
          <li key={file.name} className={styles.li}>
            <div className={styles.file_name_div}>
              <span>{index + 1}.</span>
              <span>{file.name}</span>
            </div>

            <button type="button" onClick={() => onFileDeleteHandler(index)}>
              <BackspaceIcon />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default FileInput;
