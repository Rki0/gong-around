import { useEffect, useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

import Satellite from "@/assets/satellite.svg";
import { useNearAirport } from "@/hooks/useNearAirport";

import styles from "./SearchLink.module.scss";

interface TitlesProps {
  titleArrayLength: number;
  fadeInDuration: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

interface NearestAirportInfo {
  lat: number;
  lng: number;
  name: string;
}

const SearchLink = ({ titleArrayLength, fadeInDuration }: TitlesProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { userLocation, airport } = useNearAirport();

  const blockLinkFunc = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const observeOpacity = (
    inView: boolean,
    entry: IntersectionObserverEntry
  ) => {
    let animationFrameId: number;

    function trackOpacity() {
      const computedStyles = getComputedStyle(entry.target);
      const opacityValue = computedStyles.getPropertyValue("opacity");

      if (parseFloat(opacityValue) > 0) {
        cancelAnimationFrame(animationFrameId);
        setIsVisible(true);
      } else {
        animationFrameId = requestAnimationFrame(trackOpacity);
        setIsVisible(false);
      }
    }

    animationFrameId = requestAnimationFrame(trackOpacity);
  };

  return (
    <Fade
      cascade
      duration={fadeInDuration}
      delay={fadeInDuration * titleArrayLength}
      onVisibilityChange={observeOpacity}
    >
      <Link
        // href="/map"
        href={{
          pathname: "/map",
          query: {
            lat: airport?.lat,
            lng: airport?.lng,
          },
        }}
        className={`${styles.link_common_style} ${
          isVisible ? styles.link_able : styles.link_disabled
        }`}
        onClick={isVisible ? undefined : (e) => blockLinkFunc(e)}
      >
        <Satellite className={styles.satellite} />

        {airport ? (
          <p>{airport.name} 공항 주변에서 탐색하기</p>
        ) : (
          <p>위치 탐색 중...</p>
        )}
      </Link>
    </Fade>
  );
};

export default SearchLink;
