import React from "react";

interface LabeledPasswordInputProps {
  id: string;
  labelText: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabeledPasswordInput(props: LabeledPasswordInputProps) {
  const { id, labelText, onChangeHandler } = props;

  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input type="password" id={id} onChange={onChangeHandler} />
    </>
  );
}

export default LabeledPasswordInput;
