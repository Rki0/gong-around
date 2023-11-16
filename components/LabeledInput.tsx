import styles from "./LabeledInput.module.scss";

interface EachState {
  value: string;
  isBlurred: boolean;
  isValid: boolean;
}

interface LabeledInputProps {
  label: string;
  htmlFor: string;
  id: string;
  type: string;
  name: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onBlurHandler: (e: React.FocusEvent<HTMLInputElement>) => void;
  state: EachState;
  successMessage: string;
  failedMessage: string;
}

const LabeledInput = (props: LabeledInputProps) => {
  return (
    <div>
      <label htmlFor={props.htmlFor} className={styles.label}>
        {props.label}
      </label>

      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.state.value}
        placeholder={props.placeholder}
        className={styles.input}
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
        maxLength={30}
        minLength={1}
      />

      {props.state.isBlurred ? (
        props.state.isValid ? (
          <p className={styles.success}>{props.successMessage}</p>
        ) : (
          <p className={styles.failed}>{props.failedMessage}</p>
        )
      ) : null}
    </div>
  );
};

export default LabeledInput;
