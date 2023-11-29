import React from "react";

function MyLikePage() {
  return (
    <section>
      <h1>좋아요 누른 게시물</h1>

      {/* TODO: infinite scroll using React-Query */}
      <ul>{}</ul>
    </section>
  );
}

export default MyLikePage;

export async function getStaticProps() {
  // TODO: api call

  return {
    props: {
      likedFeeds: [],
    },
  };
}
