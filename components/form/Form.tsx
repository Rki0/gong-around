import React from "react";

import styles from "./Form.module.scss";

interface FormProps {
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.JSX.Element | React.JSX.Element[];
}

function Form(props: FormProps) {
  return (
    <form className={styles.form} onSubmit={props.onSubmitHandler}>
      {props.children}
    </form>
  );
}

export default Form;
