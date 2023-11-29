// reference
// https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps
// https://youtu.be/BL2XVTqz9Ek?si=t5g6k4MHT7tugNHA

import React, { useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

import { InputProps } from "@/types/input";

import styles from "./Input.module.scss";

function LocationInput(props: InputProps) {
  const { label, target, onInput } = props;

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    // if set setValue's second argument "false", it blocks API call after change "value"
    setValue(e.currentTarget.innerText, false);
    clearSuggestions();
  };

  useEffect(() => {
    onInput(target, value);
  }, [value, onInput, target]);

  return (
    <div>
      <label htmlFor={target} className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        id={target}
        value={value}
        onChange={onChangeHandler}
        disabled={!ready}
        placeholder="장소를 검색해보세요."
      />

      <ul>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <li key={place_id} onClick={onClickHandler}>
              {description}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LocationInput;
