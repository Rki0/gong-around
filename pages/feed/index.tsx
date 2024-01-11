import { useRouter } from "next/router";
import React, { useCallback, useReducer } from "react";

import Form from "@/components/form/Form";
import TextInput from "@/components/input/TextInput";
import DateInput from "@/components/input/DateInput";
import FileInput from "@/components/input/FileInput";
import TextArea from "@/components/textArea/TextArea";
import LocationInput from "@/components/input/LocationInput";
import Button from "@/components/button/Button";
import getGeoCoordinate from "@/utils/getGeoCoordinate";
import useCreateFeedQuery from "@/query/useCreateFeedQuery";

import styles from "./index.module.scss";

interface InitialState {
  [key: string]: any;
  title: string;
  date: string;
  location: string;
  images: File[];
  description: string;
  isValid: boolean;
}

interface Action {
  type: string;
  target: string;
  payload: string | File[];
}

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      if (
        state.title !== "" &&
        state.date !== "" &&
        state.location !== "" &&
        state.description !== ""
      ) {
        state.isValid = true;
      }

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
    images: [],
    description: "",
    isValid: false,
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

  const createFeedMutation = useCreateFeedQuery();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.isValid) {
      return alert("등록된 정보가 부족합니다.");
    }

    const geo = await getGeoCoordinate(formState.location);

    const newLocation = {
      ...geo,
      address: formState.location,
    };

    const createdFeedData = { ...formState, location: newLocation };

    const formData = new FormData();

    for (let state in createdFeedData) {
      if (state === "location") {
        // to save Object in FormData
        formData.append(state, JSON.stringify(createdFeedData.location));
      } else if (state === "images") {
        for (let i = 0; i < formState[state].length; i++) {
          formData.append(state, formState[state][i]);
        }
      } else {
        formData.append(state, formState[state]);
      }
    }

    createFeedMutation(formData);
  };

  const router = useRouter();

  const cancelHandler = () => {
    router.back();
  };

  return (
    <section className={styles.section}>
      <Form onSubmitHandler={submitHandler}>
        <TextInput
          label="제목"
          target="title"
          onInput={inputChangeHandler}
          required={true}
        />

        <DateInput
          label="날짜"
          target="date"
          onInput={inputChangeHandler}
          required={true}
        />

        {/* TODO: 어떤 나라, 어떤 공항에 대한 것인지 선택할 수 있도록 하자. */}

        <LocationInput
          label="장소"
          target="location"
          onInput={inputChangeHandler}
          required={true}
        />

        <FileInput label="파일" target="images" onInput={inputChangeHandler} />

        <TextArea
          label="내용"
          target="description"
          onInput={inputChangeHandler}
          required={true}
        />

        <div className={styles.btn_div}>
          <Button
            type="button"
            onClickHandler={cancelHandler}
            style={styles.cancel_btn}
          >
            취소
          </Button>
          <Button type="submit" style={styles.submit_btn}>
            등록
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default CreateFeedPage;
