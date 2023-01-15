import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import BreadCrumbNav from "../../components/BreadCrumbNav";
import HomePageSearch from "../../components/HomePageSearch";
import PostFeed from "../../components/PostFeed";
import {
  getAllPostFromFireStore,
  loadMorePostsFromFirestore,
} from "../../lib/firebase";
import { mapPostsToJson } from "../../lib/util";
import { Post } from "../../types";

const LIMIT = 5;
export async function getServerSideProps() {
  let posts = null;
  const postsDoc = await getAllPostFromFireStore(LIMIT);

  if (!postsDoc) return { props: { posts } };

  posts = mapPostsToJson(postsDoc);

  return { props: { _posts: posts } };
}

export default function Home({ _posts }: { _posts: Post[] }) {
  const [posts, setPosts] = useState<Post[] | null>(_posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  async function getMorePosts() {
    // loading - true
    setLoading(true);
    // fetch more post
    const lastPost = posts![posts!.length - 1];
    const beforeDate = Timestamp.fromDate(
      new Date(lastPost.createdAt as string)
    );
    const postsDoc = await loadMorePostsFromFirestore(LIMIT, beforeDate);

    if (!postsDoc) {
      setLoading(false);
      setPostsEnd(true);
      return;
    }

    const newPosts = mapPostsToJson(postsDoc) as Post[];
    // update current post
    setPosts((prev) => (prev ? [...prev, ...newPosts] : [...newPosts]));

    // loading - falses
    setLoading(false);
    // if isPostEnd - setPostEnd - true
    if (newPosts.length < LIMIT) setPostsEnd(true);
  }

  return (
    <>
      <HomePageSearch />
      <br />
      <PostFeed
        posts={posts}
        admin={false}
        isHomePage={true}
        loading={loading}
        postsEnd={postsEnd}
        getMorePosts={getMorePosts}
      />
    </>
  );
}
