import React, { useCallback, useReducer, useState } from "react";

import Form from "@/components/form/Form";
import TextInput from "@/components/input/TextInput";
import DateInput from "@/components/input/DateInput";
import FileInput from "@/components/input/FileInput";
import TextArea from "@/components/textArea/TextArea";
import Button from "@/components/button/Button";

import styles from "./index.module.scss";

interface InitialState {
  [key: string]: any;
  title: string;
  date: string;
  location: string;
  images: null | File[];
  description: string;
}

interface Action {
  type: string;
  target: string;
  payload: string | File[];
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

function CreateFeedPage() {
  const [formState, dispatch] = useReducer(reducer, {
    title: "",
    date: "",
    location: "",
    images: null,
    description: "",
  });

  const inputChangeHandler = useCallback(
    (target: string, value: string | File[]) => {
      dispatch({
        type: "CHANGE_INPUT",
        target,
        payload: value,
      });
    },
    []
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: 입력값 검증 로직 필요

    // file이 있는 경우 = FormData
    if (formState.images) {
      const formData = new FormData();

      for (let state in formState) {
        formData.append(state, formState[state]);
      }

      formData.append("writer", "TEST_USER");

      fetch(`${process.env.APP_BACKEND}/feed/post`, {
        method: "POST",
        body: formData,
      });
    }

    // file이 없는 경우 = JSON.stringify
    if (!formState.images) {
      const data = {
        title: formState.title,
        date: formState.date,
        images: formState.images,
        location: formState.location,
        description: formState.description,
        writer: "TEST_USER",
      };

      fetch(`${process.env.APP_BACKEND}/feed/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  };

  return (
    <section className={styles.section}>
      <Form onSubmitHandler={submitHandler}>
        <TextInput label="제목" target="title" onInput={inputChangeHandler} />

        <DateInput label="날짜" target="date" onInput={inputChangeHandler} />

        <TextInput
          label="위치"
          target="location"
          onInput={inputChangeHandler}
        />

        <FileInput label="파일" target="images" onInput={inputChangeHandler} />

        <TextArea
          label="내용"
          target="description"
          onInput={inputChangeHandler}
        />

        <Button type="button">취소</Button>
        <Button type="submit">등록</Button>
      </Form>
    </section>
  );
}

export default CreateFeedPage;
