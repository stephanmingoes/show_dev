import React from "react";
import PostFeed from "../../../components/PostFeed";
import UserProfile from "../../../components/UserProfile";
import { Post, User } from "../../../types";
import { GetServerSidePropsContext } from "next";
import {
  getUserFromFirestoreWithUsername,
  getUserPostsFromFireStore,
} from "../../../lib/firebase";
import { mapPostsToJson } from "../../../lib/util";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { username } = context.params!;
  let user = null;
  let posts = null;
  const userDoc = await getUserFromFirestoreWithUsername(username as string);
  if (!userDoc)
    return {
      notFound: true,
    };
  user = userDoc.data();
  const postsDoc = await getUserPostsFromFireStore(userDoc.ref.path);
  if (!postsDoc?.length) return { props: { user, posts } };

  posts = mapPostsToJson(postsDoc);

  return { props: { user, posts } };
}

export default function Username({
  user,
  posts,
}: {
  user: User;
  posts: Post[] | null;
}) {
  return (
    <>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} isHomePage={false} />
    </>
  );
}
