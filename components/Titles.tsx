import { Fade } from "react-awesome-reveal";

import { Title } from "@/pages";

import styles from "./Titles.module.scss";

interface TitlesProps {
  titleArray: Title[];
  fadeInDuration: number;
}

const Titles = ({ titleArray, fadeInDuration }: TitlesProps) => {
  return titleArray.map((data, index) => (
    <Fade
      cascade
      duration={fadeInDuration}
      delay={fadeInDuration * index}
      direction="up"
      key={data.id}
    >
      <h1 className={styles.section_title}>{data.title}</h1>
    </Fade>
  ));
};

export default Titles;
