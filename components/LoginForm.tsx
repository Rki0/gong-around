import { useState } from "react";
import { useRouter } from "next/router";
// import axios from "axios";

import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // const router = useRouter();

  const onEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return alert("이메일 혹은 비밀번호를 입력해주세요.");
    }

    const userData = {
      email,
      password,
    };

    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}/auth/login`,
    //     userData
    //   );

    //   if (response.status >= 200 && response.status < 300) {
    //     router.push("/");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.form}>
      <div>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>

        <input
          id="email"
          type="email"
          name="email"
          onChange={onEmailChangeHandler}
          value={email}
          placeholder="이메일을 입력해주세요."
          className={styles.input}
        />
      </div>

      <div>
        <label htmlFor="password" className={styles.label}>
          비밀번호
        </label>

        <input
          id="password"
          type="password"
          name="password"
          onChange={onPasswordChangeHandler}
          value={password}
          placeholder="비밀번호를 입력해주세요."
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.button}>
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
