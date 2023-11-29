import React, { useCallback, useReducer, useState } from "react";

import Form from "@/components/form/Form";
import TextInput from "@/components/input/TextInput";
import DateInput from "@/components/input/DateInput";
import FileInput from "@/components/input/FileInput";
import TextArea from "@/components/textArea/TextArea";
import LocationInput from "@/components/input/LocationInput";
import Button from "@/components/button/Button";
import getGeoCoordinate from "@/utils/getGeoCoordinate";

import styles from "./index.module.scss";
import { useRouter } from "next/router";

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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const geo = await getGeoCoordinate(formState.location);

    // TODO: replace location which in fetch API body with newLocation
    const newLocation = {
      ...geo,
      address: formState.location,
    };

    console.log(formState, newLocation);

    return;

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

  const router = useRouter();

  const cancelHandler = () => {
    router.back();
  };

  return (
    <section className={styles.section}>
      <Form onSubmitHandler={submitHandler}>
        <TextInput label="제목" target="title" onInput={inputChangeHandler} />

        <DateInput label="날짜" target="date" onInput={inputChangeHandler} />

        {/* TODO: 어떤 나라, 어떤 공항에 대한 것인지 선택할 수 있도록 하자. */}

        <LocationInput
          label="장소"
          target="location"
          onInput={inputChangeHandler}
        />

        <FileInput label="파일" target="images" onInput={inputChangeHandler} />

        <TextArea
          label="내용"
          target="description"
          onInput={inputChangeHandler}
        />

        <Button type="button" onClickHandler={cancelHandler}>
          취소
        </Button>
        <Button type="submit">등록</Button>
      </Form>
    </section>
  );
}

export default CreateFeedPage;
