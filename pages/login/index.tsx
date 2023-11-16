import React from "react";
import Link from "next/link";

import Inflight from "@/assets/plane-inflight.svg";
import LoginForm from "@/components/LoginForm";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <section className={styles.page_section}>
      <h1>
        <span>로그인</span>

        <Inflight />
      </h1>

      <LoginForm />

      <p>
        아직 회원가입을 하지 않으셨나요? <br />
        <Link href="/signup">회원가입</Link> 페이지로 이동해주세요.
      </p>
    </section>
  );
};

export default LoginPage;
