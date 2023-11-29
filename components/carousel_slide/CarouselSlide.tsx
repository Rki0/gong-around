// reference
// https://velog.io/@jujusnake/JULABO-React.js%EB%A1%9C-Infinite-Carousel-%EA%B5%AC%ED%98%84-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%AF%B8%EC%82%AC%EC%9A%A9

import React, { useState } from "react";
import Image from "next/image";

import Pagination from "./Pagination";

import { ImageAttribute } from "@/types/image.ts";

import styles from "./CarouselSlide.module.scss";

interface CarouselSlideProps {
  // images: ImageAttribute[] | ImageAttribute;
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

  return (
    <div className={styles.carousel}>
      <div className={styles.slide_btn}>
        <button onClick={throttledLeftClickHandler}>Left</button>
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
            <div key={image.id} className={styles.image_div}>
              <Image
                src={image.src}
                alt={image.alt}
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
        <button onClick={throttledRightClickHandler}>Right</button>
      </div>

      <Pagination
        length={images.length}
        setSlideIndex={setSlideIndex}
        setTransition={setTransition}
      />
    </div>
  );
}

export default CarouselSlide;
