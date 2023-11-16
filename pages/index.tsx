import Titles from "@/components/Titles";
import SearchLink from "@/components/SearchLink";

import styles from "./LandingPage.module.scss";

export interface Title {
  id: number;
  title: string;
}

const FADE_IN_DURATION = 500;

const TITLE_ARRAY: Title[] = [
  {
    id: 1,
    title: "공항에 빨리 도착해서",
  },
  {
    id: 2,
    title: "붕~ 떠버린 시간을",
  },
  {
    id: 3,
    title: "활용하기 위해",
  },
  {
    id: 4,
    title: "주변에서 할 수 있는 것은?",
  },
];

const LandingPage = () => {
  return (
    <div className={styles.background_div}>
      <section className={styles.section}>
        <Titles titleArray={TITLE_ARRAY} fadeInDuration={FADE_IN_DURATION} />

        <SearchLink
          titleArrayLength={TITLE_ARRAY.length}
          fadeInDuration={FADE_IN_DURATION}
        />
      </section>
    </div>
  );
};

export default LandingPage;
