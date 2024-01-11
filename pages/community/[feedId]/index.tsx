import React, { useContext, useMemo } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import Comments from "@/components/comment/Comments";
import CarouselSlide from "@/components/carousel_slide/CarouselSlide";
import CommentForm from "@/components/form/CommentForm";
import useCreateCommentQuery from "@/query/useCreateCommentQuery";
import useLikeFeedQuery from "@/query/useLikeFeedQuery";
import useDislikeFeedQuery from "@/query/useDislikeFeedQuery";
import { getLocaleTimeFromUTC } from "@/utils/getLocaleTimeFromUTC";
import { AuthContext } from "@/context/authContext";
import ThumbsIcon from "@/assets/thumbs-up.svg";
import ThumbsFilledIcon from "@/assets/thumbs-up-filled.svg";

import { CommentType } from "@/types/comment.ts";
import { ImageAttribute } from "@/types/image.ts";
import { Coordinate } from "@/types/coordinate";

import styles from "./index.module.scss";

interface FeedDetailPageProps {
  [key: string]: any;
  _id: string;
  title: string;
  location: {
    address: string;
    location: {
      type: string;
      coordinates: number[];
    };
  };
  writer: {
    _id: string;
    nickname: string;
  };
  description: string;
  like: number;
  view: number;
  comments: CommentType[];
  images: ImageAttribute[];
  createdAt: string;
  isLikedFeed: boolean;
  // post_date: string;
  // travel_date: string;
  // airport_name: string;
  // required_time: number;
}

// TODO: please implement logic to get id 3,4,5 property
const FEED_HEAD = [
  {
    id: 1,
    label: "제목",
    key: "title",
  },
  {
    id: 2,
    label: "게시 날짜",
    key: "createdAt",
  },
  // {
  //   id: 3,
  //   label: "여행 날짜",
  //   key: "travel_date",
  // },
  // {
  //   id: 4,
  //   label: "주변 공항",
  //   key: "airport_name",
  // },
  // {
  //   id: 5,
  //   label: "소요 시간",
  //   key: "required_time",
  // },
  {
    id: 6,
    label: "작성자",
    key: "writer",
  },
  {
    id: 7,
    label: "조회수",
    key: "view",
  },
];

function FeedDetailPage(props: FeedDetailPageProps) {
  console.log("props", props);

  const libraries = useMemo(() => ["places", "maps"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: libraries as any,
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const getFeedHead = (key: string) => {
    switch (key) {
      case "writer":
        return props.writer.nickname;

      case "createdAt":
        return getLocaleTimeFromUTC(props.createdAt);

      default:
        return props[key];
    }
  };

  const authCtx = useContext(AuthContext);

  // TODO: optimistic update
  const commentMutation = useCreateCommentQuery();
  const likeMutate = useLikeFeedQuery();
  const dislikeMutate = useDislikeFeedQuery();

  const likeClickHandler = () => {
    if (!authCtx.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    // TODO: If user already liked this feed, change API to control increment/decrement
    // SUGGEST: How about to get likedFeeds data with auth data when user logged in.
    // SUGGEST: Or how about to get liked(boolean) data with deatil feed data. It should work conditionally(loggedIn or non-loggedIn)
    // SUGGEST: The other is more better approach.
    // if(){
    //   likeMutate();

    // }else {
    //   dislikeMutate();

    // }
    likeMutate();
    // dislikeMutate();

    // TODO: isSuccess => 이전 좋아요 상태에 따라 UI 변경 필요
  };

  return (
    <section className={styles.section}>
      <div className={styles.section_div}>
        <div className={styles.feed_head}>
          {FEED_HEAD.map((head) => (
            <div key={head.id} className={styles.head_property}>
              <span>{head.label}:</span>

              <p>{getFeedHead(head.key)}</p>
            </div>
          ))}
        </div>

        <div className={styles.description_div}>
          <p>{props.description}</p>
        </div>

        <CarouselSlide images={props.images} />

        {isLoaded ? (
          <div className={styles.map_div}>
            <GoogleMap
              options={mapOptions}
              zoom={15}
              center={{
                lat: props.location.location.coordinates[1],
                lng: props.location.location.coordinates[0],
              }}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: "600px", height: "600px" }}
            >
              <MarkerF
                position={{
                  lat: props.location.location.coordinates[1],
                  lng: props.location.location.coordinates[0],
                }}
              />
            </GoogleMap>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <div className={styles.like_div} onClick={likeClickHandler}>
          {props.isLikedFeed ? <ThumbsFilledIcon /> : <ThumbsIcon />}

          <p>{props.like}</p>
        </div>

        <hr className={styles.hr} />

        <div className={styles.comment_div}>
          <CommentForm
            name="comment"
            textPlaceholder="댓글 추가"
            mutate={commentMutation}
          />

          <Comments comments={props.comments} />
        </div>
      </div>
    </section>
  );
}

export default FeedDetailPage;

// reference
// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths#generating-paths-on-demand
// https://stackoverflow.com/questions/72765738/why-do-we-only-need-getstaticpaths-when-we-use-getstaticprops
export async function getStaticPaths() {
  // SUGGEST: pre-render top 10 viewed feeds using redis(please create new API)
  return {
    paths: [],
    fallback: "blocking",
  };
}

// FIXME: getStaticPaths로 pre-fetch 한 애들을 제외하고는 해당 페이지에서 새로고침을 할 경우 undefined 에러가 발생한다.
export async function getStaticProps(context: any) {
  const feedId = context.params.feedId;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BACKEND}/feed/${feedId}`
  );

  const data = await response.json();

  return {
    props: data,
    revalidate: 600,
  };
}
