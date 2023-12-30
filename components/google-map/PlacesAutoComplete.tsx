// reference
// https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps
// https://youtu.be/BL2XVTqz9Ek?si=t5g6k4MHT7tugNHA

import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

import getGeoCoordinate from "@/utils/getGeoCoordinate";
import DeleteIcon from "@/assets/delete.svg";

import { Coordinate } from "@/types/coordinate";

import styles from "./PlacesAutoComplete.module.scss";

interface PlacesAutoCompleteProps {
  setMapCenter: React.Dispatch<React.SetStateAction<Coordinate | undefined>>;
}

function PlacesAutoComplete(props: PlacesAutoCompleteProps) {
  const { setMapCenter } = props;

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

  const onClickHandler = async (e: React.MouseEvent<HTMLLIElement>) => {
    // if set setValue's second argument "false", it blocks API call after change "value"
    setValue(e.currentTarget.innerText, false);
    clearSuggestions();

    const coordData = await getGeoCoordinate(e.currentTarget.innerText);

    setMapCenter(coordData);

    // TODO: api call to get top nearest feeds from the "coordData" and set MapPage setMarkers state
  };

  const deleteClickHandler = () => {
    setValue("");
  };

  return (
    <div className={styles.auto_div}>
      <div className={styles.input_div}>
        <input
          type="text"
          value={value}
          onChange={onChangeHandler}
          disabled={!ready}
          placeholder="장소를 검색해보세요."
          className={styles.input}
        />

        <div className={styles.delete_icon} onClick={deleteClickHandler}>
          <DeleteIcon />
        </div>
      </div>

      <ul className={styles.ul}>
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

export default PlacesAutoComplete;
