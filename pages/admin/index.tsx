import React, { useContext, useEffect, useState } from "react";
import AuthWrapper from "../../components/AuthWrapper";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserPostsFromFireStore } from "../../lib/firebase";
import { UserContext } from "../../lib/userContext";
import { mapPostsToJson } from "../../lib/util";
import { Post, User } from "../../types";

export default function Admin() {
  const { firebaseUser, user } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    async function getPosts() {
      if (!user) return;
      const postsDoc = await getUserPostsFromFireStore("users/" + user!.uid);
      if (!postsDoc?.length) return;

      setPosts(mapPostsToJson(postsDoc) as Post[]);
    }
    getPosts().catch((err) => console.log(err));
  }, [user]);
  return (
    <AuthWrapper>
      <UserProfile user={firebaseUser as User} />
      <PostFeed posts={posts} admin={true} />
    </AuthWrapper>
  );
}
