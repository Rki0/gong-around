import Link from "next/link";

import SignupForm from "@/components/SignupForm";
import Departure from "@/assets/plane-departure.svg";

import styles from "./SignupPage.module.scss";

const SignupPage = () => {
  return (
    <section className={styles.page_section}>
      <h1>
        <span>회원가입</span>

        <Departure />
      </h1>

      <SignupForm />

      <p>
        이미 회원가입을 하셨나요? <br />
        <Link href="/login">로그인</Link> 페이지로 이동해주세요.
      </p>
    </section>
  );
};

export default SignupPage;
