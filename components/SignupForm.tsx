import { useReducer } from "react";

import LabeledInput from "./LabeledInput";
import useSignUpQuery from "@/query/useSignUpQuery";

import styles from "./SignupForm.module.scss";

type Action =
  | { type: "SET_BLURRED"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CHECK_PASSWORD"; payload: string }
  | { type: "CHECK_FORM_VALID" };

export interface EachState {
  value: string;
  isBlurred: boolean;
  isValid: boolean;
}

interface State {
  name: EachState;
  email: EachState;
  password: EachState;
  checkPassword: EachState;
  isValid: boolean;
}

const initialState: State = {
  name: {
    value: "",
    isBlurred: false,
    isValid: false,
  },
  email: {
    value: "",
    isBlurred: false,
    isValid: false,
  },
  password: {
    value: "",
    isBlurred: false,
    isValid: false,
  },
  checkPassword: {
    value: "",
    isBlurred: false,
    isValid: false,
  },
  isValid: false,
};

const nameRegex = /^[\w가-힣]{1,15}$/;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_BLURRED":
      if (action.payload === "email") {
        return { ...state, email: { ...state.email, isBlurred: true } };
      }

      if (action.payload === "password") {
        return { ...state, password: { ...state.password, isBlurred: true } };
      }

      return {
        ...state,
        checkPassword: { ...state.checkPassword, isBlurred: true },
      };

    case "SET_NAME":
      if (nameRegex.test(action.payload)) {
        return {
          ...state,
          name: {
            ...state.name,
            value: action.payload,
            isValid: true,
          },
        };
      }

      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload,
          isValid: false,
          isBlurred: true,
        },
      };

    case "SET_EMAIL":
      if (emailRegex.test(action.payload)) {
        return {
          ...state,
          email: {
            ...state.email,
            value: action.payload,
            isValid: true,
          },
        };
      }

      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload,
          isValid: false,
          isBlurred: true,
        },
      };

    case "SET_PASSWORD":
      if (passwordRegex.test(action.payload)) {
        if (action.payload !== state.checkPassword.value) {
          return {
            ...state,
            password: {
              ...state.password,
              value: action.payload,
              isValid: true,
            },
            checkPassword: {
              ...state.checkPassword,
              isValid: false,
            },
          };
        }

        if (action.payload === state.checkPassword.value) {
          return {
            ...state,
            password: {
              ...state.password,
              value: action.payload,
              isValid: true,
            },
            checkPassword: {
              ...state.checkPassword,
              isValid: true,
            },
          };
        }

        return {
          ...state,
          password: {
            ...state.password,
            value: action.payload,
            isValid: true,
          },
        };
      }

      return {
        ...state,
        password: {
          ...state.password,
          value: action.payload,
          isValid: false,
          isBlurred: true,
        },
      };

    case "SET_CHECK_PASSWORD":
      if (state.password.value === action.payload) {
        return {
          ...state,
          checkPassword: {
            ...state.checkPassword,
            value: action.payload,
            isValid: true,
          },
        };
      }

      return {
        ...state,
        checkPassword: {
          ...state.checkPassword,
          value: action.payload,
          isValid: false,
          isBlurred: true,
        },
      };

    case "CHECK_FORM_VALID":
      if (
        state.email.isValid &&
        state.password.isValid &&
        state.checkPassword.isValid
      ) {
        return { ...state, isValid: true };
      }

      return state;

    default:
      return state;
  }
};

const SignupForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeHandler =
    (type: Action["type"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type, payload: e.target.value });
      dispatch({ type: "CHECK_FORM_VALID" });
    };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_BLURRED", payload: e.target.name });
  };

  const signUpMutation = useSignUpQuery();

  // SUGGEST: this function can be more abstracted through combining with signUp function which in the useSignUpQuery.ts
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !state.email.isValid ||
      !state.password.isValid ||
      !state.checkPassword.isValid
    ) {
      return alert("올바르지 않은 정보가 입력되었습니다. 다시 시도해주세요.");
    }

    if (state.password.value !== state.checkPassword.value) {
      return alert("비밀번호를 다시 확인해주세요.");
    }

    const userData = {
      nickname: state.name.value,
      email: state.email.value,
      password: state.password.value,
    };

    try {
      signUpMutation(userData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.form}>
      <LabeledInput
        label="닉네임"
        htmlFor="name"
        id="name"
        type="text"
        name="name"
        state={state.name}
        onChangeHandler={onChangeHandler("SET_NAME")}
        placeholder="닉네임을 입력해주세요."
        onBlurHandler={onBlurHandler}
        successMessage="올바른 형식입니다."
        failedMessage="알파벳, 한글, _ 기호만 사용해주세요."
      />

      <LabeledInput
        label="이메일"
        htmlFor="email"
        id="email"
        type="email"
        name="email"
        state={state.email}
        onChangeHandler={onChangeHandler("SET_EMAIL")}
        placeholder="이메일을 입력해주세요."
        onBlurHandler={onBlurHandler}
        successMessage="올바른 형식입니다."
        failedMessage="올바르지 않은 형식입니다."
      />

      <LabeledInput
        label="비밀번호"
        htmlFor="password"
        id="password"
        type="password"
        name="password"
        state={state.password}
        onChangeHandler={onChangeHandler("SET_PASSWORD")}
        placeholder="비밀번호를 입력해주세요."
        onBlurHandler={onBlurHandler}
        successMessage="올바른 형식입니다."
        failedMessage="올바르지 않은 형식입니다."
      />

      <LabeledInput
        label="비밀번호 확인"
        htmlFor="check-password"
        id="check-password"
        type="password"
        name="check-password"
        state={state.checkPassword}
        onChangeHandler={onChangeHandler("SET_CHECK_PASSWORD")}
        placeholder="비밀번호를 다시 한번 입력해주세요."
        onBlurHandler={onBlurHandler}
        successMessage="비밀번호가 일치합니다."
        failedMessage="비밀번호가 일치하지 않습니다."
      />

      <button type="submit" className={styles.button} disabled={!state.isValid}>
        가입하기
      </button>
    </form>
  );
};

export default SignupForm;
