import React, { useState, useEffect } from "react";

interface TextAreaProps {
  label: string;
  target: string;
  onInput: (target: string, value: string) => void;
}

function TextArea(props: TextAreaProps) {
  const { label, target, onInput } = props;

  const [inputState, setInputState] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputState(e.target.value);
  };

  useEffect(() => {
    onInput(target, inputState);
  }, [inputState, onInput, target]);

  return (
    <div>
      <label>{label}</label>
      <textarea value={inputState} onChange={onChangeHandler} />
    </div>
  );
}

export default TextArea;
