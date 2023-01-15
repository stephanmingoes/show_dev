import { GetServerSidePropsContext } from "next";
import React from "react";
import {
  getAllPostFromFireStoreWithoutLimit,
  getUserFromFirestoreWithUsername,
  getUserPostFromFireStore,
} from "../../../lib/firebase";
import { mapPostsToJson } from "../../../lib/util";
import { Post, User } from "../../../types";

import BlogPost from "../../../components/BlogPost";

export async function getStaticProps(context: GetServerSidePropsContext) {
  const { username, slug } = context.params!;
  let user = null;
  let post = null;

  const userDoc = await getUserFromFirestoreWithUsername(username as string);
  if (!userDoc)
    return {
      notFound: true,
    };
  const postsDoc = await getUserPostFromFireStore(
    userDoc.ref.path,
    slug as string
  );

  if (!postsDoc?.length)
    return {
      notFound: true,
    };

  user = userDoc.data();

  post = mapPostsToJson(postsDoc)[0];

  return { props: { user, post }, revalidate: 5000 };
}

export async function getStaticPaths() {
  const postDocs = await getAllPostFromFireStoreWithoutLimit();

  const paths = postDocs?.map((post) => ({
    params: { username: post.data().username, slug: post.data().slug },
  }));

  return { paths, fallback: "blocking" };
}

export default function Slug({
  user,
  post,
}: {
  user: User;
  post: Post;
  path: string;
}) {
  return (
    <>
      <BlogPost user={user} post={post} />
    </>
  );
}
