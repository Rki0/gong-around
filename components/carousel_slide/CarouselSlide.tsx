// reference
// https://velog.io/@jujusnake/JULABO-React.js%EB%A1%9C-Infinite-Carousel-%EA%B5%AC%ED%98%84-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%AF%B8%EC%82%AC%EC%9A%A9

import React, { useState } from "react";
import Image from "next/image";

import Pagination from "./Pagination";
import RightIcon from "@/assets/right.svg";
import LeftIcon from "@/assets/left.svg";

import { ImageAttribute } from "@/types/image.ts";

import styles from "./CarouselSlide.module.scss";

interface CarouselSlideProps {
  images: ImageAttribute[];
}

function CarouselSlide(props: CarouselSlideProps) {
  const { images } = props;

  const copiedImages = [
    { ...images[images.length - 1], id: 0 },
    ...images,
    { ...images[0], id: images.length + 1 },
  ];

  const [slideIndex, setSlideIndex] = useState(1);
  const [transition, setTransition] = useState("all 500ms ease-in-out");
  const [throttle, setThrottle] = useState(false);

  const leftClickHandler = () => {
    const newCurr = slideIndex - 1;
    setSlideIndex(newCurr);

    if (newCurr === 0) {
      moveToNthSlide(copiedImages.length - 2);
    }

    setTransition("all 500ms ease-in-out");
  };

  const rightClickHandler = () => {
    const newCurr = slideIndex + 1;
    setSlideIndex(newCurr);

    if (newCurr === copiedImages.length - 1) {
      moveToNthSlide(1);
    }

    setTransition("all 500ms ease-in-out");
  };

  const moveToNthSlide = (n: number) => {
    setTimeout(() => {
      setTransition("none");
      setSlideIndex(n);
    }, 500);
  };

  const throttledLeftClickHandler = () => {
    if (throttle) {
      return;
    }

    setThrottle(true);

    leftClickHandler();

    setTimeout(() => {
      setThrottle(false);
    }, 500);
  };

  const throttledRightClickHandler = () => {
    if (throttle) {
      return;
    }

    setThrottle(true);

    rightClickHandler();

    setTimeout(() => {
      setThrottle(false);
    }, 500);
  };

  if (images.length === 0) {
    return;
  }

  if (images.length === 1) {
    return (
      <div key={images[0]._id} className={styles.image_div}>
        <Image
          src={images[0].path}
          alt="image about feed"
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </div>
    );
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.slide_section}>
        <div>
          <button
            className={styles.slide_btn}
            onClick={throttledLeftClickHandler}
          >
            <LeftIcon />
          </button>
        </div>

        <div className={styles.view_frame}>
          <div
            className={styles.image_film}
            style={{
              transition,
              transform: `translateX(${
                -1 * ((100 / copiedImages.length) * slideIndex)
              }%)`,
            }}
          >
            {copiedImages.map((image) => (
              <div key={image._id} className={styles.image_div}>
                <Image
                  src={image.path}
                  alt="image about feed"
                  width={500}
                  height={500}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            className={styles.slide_btn}
            onClick={throttledRightClickHandler}
          >
            <RightIcon />
          </button>
        </div>
      </div>

      <Pagination
        length={images.length}
        setSlideIndex={setSlideIndex}
        setTransition={setTransition}
        currentSlide={slideIndex}
      />
    </div>
  );
}

export default CarouselSlide;
