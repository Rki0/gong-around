import React, { useMemo } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import Comments from "@/components/comment/Comments";
import CarouselSlide from "@/components/carousel_slide/CarouselSlide";
import CommentForm from "@/components/form/CommentForm";

import { Comment } from "@/types/comment.ts";
import { ImageAttribute } from "@/types/image.ts";
import { Coordinate } from "@/types/coordinate";

import styles from "./index.module.scss";

interface FeedDetailPageProps {
  [key: string]: any;
  id: number;
  title: string;
  post_date: string;
  travel_date: string;
  airport_name: string;
  location: Coordinate;
  required_time: number;
  writer: string;
  like: number;
  view: number;
  images: ImageAttribute[];
  comments: Comment[];
}

const FEED_HEAD = [
  {
    id: 1,
    label: "제목",
    key: "title",
  },
  {
    id: 2,
    label: "게시 날짜",
    key: "post_date",
  },
  {
    id: 3,
    label: "여행 날짜",
    key: "travel_date",
  },
  {
    id: 4,
    label: "주변 공항",
    key: "airport_name",
  },
  {
    id: 5,
    label: "소요 시간",
    key: "required_time",
  },
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
  // TODO: activate this annotation after implement carousel slider
  // const libraries = useMemo(() => ["places", "maps"], []);

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
  //   libraries: libraries as any,
  // });

  // const mapOptions = useMemo<google.maps.MapOptions>(
  //   () => ({
  //     disableDefaultUI: false,
  //     clickableIcons: true,
  //     scrollwheel: true,
  //   }),
  //   []
  // );

  // if (!isLoaded) {
  //   return <p>Loading...</p>;
  // }

  return (
    <section className={styles.section}>
      <div>
        {FEED_HEAD.map((head) => (
          <div key={head.id}>
            <span>{head.label}</span>
            <p>{props[head.key]}</p>
          </div>
        ))}
      </div>

      {/* TODO: If there is one iamge, don't use CarouselSlide. Just render Image. */}
      <CarouselSlide images={props.images} />

      {/* <div>
        <GoogleMap
          options={mapOptions}
          zoom={13}
          center={{
            lat: props.location.lat,
            lng: props.location.lng,
          }}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "600px", height: "600px" }}
        >
          <MarkerF
            position={{
              lat: props.location.lat,
              lng: props.location.lng,
            }}
          />
        </GoogleMap>
      </div> */}

      <div>
        <span>좋아요</span>
        <p>{props.like}</p>
      </div>

      <CommentForm name="comment" textPlaceholder="댓글 추가" />

      <Comments comments={props.comments} />
    </section>
  );
}

export default FeedDetailPage;

export async function getStaticPaths() {
  // TODO: pre-render top 5 viewed feeds
  return {
    paths: [
      {
        params: {
          feedId: "1",
        },
      },
      {
        params: {
          feedId: "2",
        },
      },
      {
        params: {
          feedId: "3",
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps() {
  const DUMMY_DATA = {
    id: 1,
    title: "김포공항 좋네요",
    post_date: "2023.11.17",
    travel_date: "2023.11.16",
    airport_name: "Gimpo",
    location: {
      lat: 37.5658264,
      lng: 126.8010869,
    },
    required_time: 60, // min? second?
    writer: "Rki0",
    like: 0,
    view: 0,
    images: [
      {
        id: 1,
        alt: "this is image",
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        alt: "this is image",
        src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    comments: [
      {
        id: 1,
        writer: "Rki1",
        content: "This is comment 1 of feed",
        like: 0,
        sub_comments: [],
      },
      {
        id: 2,
        writer: "Rki2",
        content: "This is comment 2 of feed",
        like: 0,
        sub_comments: [
          {
            id: 1,
            writer: "Rki1",
            content: "This is sub_comment 1 of comment 1",
            like: 0,
          },
          {
            id: 2,
            writer: "Rki3",
            content: "This is sub_comment 2 of comment 1",
            like: 0,
          },
        ],
      },
    ],
  };

  return {
    props: DUMMY_DATA,
    revalidate: 600,
  };
}
