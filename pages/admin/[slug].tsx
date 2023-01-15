import { serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import PostEdit from "../../components/PostEdit";
import { getUserPostFromFireStore } from "../../lib/firebase";
import { UserContext } from "../../lib/userContext";
import { mapPostsToJson } from "../../lib/util";
import { Post } from "../../types";

export default function Slug() {
  const {
    query: { slug },
  } = useRouter();
  const [post, setPost] = useState<Post>();
  const { user, username } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      const postsDoc = await getUserPostFromFireStore(
        `users/${user?.uid}`,
        slug as string
      );
      if (!postsDoc?.length) {
        setPost(undefined);
        return;
      }

      setPost(mapPostsToJson(postsDoc)[0] as Post | undefined);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [slug, user?.uid]);

  useEffect(() => {
    if (!user || !username || !slug) return;
    getPosts()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [getPosts, slug, user, username]);

  if (loading) return <Loader show={loading} />;

  return (
    <>
      {post && (
        <PostEdit
          post={{
            ...post,
            createdAt: new Date(post.createdAt as string),
            updatedAt: serverTimestamp(),
          }}
          isEdit={true}
        />
      )}
    </>
  );
}
