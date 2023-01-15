import React from "react";
import AuthWrapper from "../../components/AuthWrapper";
import { Post } from "../../types";
import { serverTimestamp } from "firebase/firestore";
import PostEdit from "../../components/PostEdit";

export default function CreatePost() {
  const postData: Post = {
    content:
      "# Edit your post in this Markdown Editor \n\n```javascript\nconsole.log('Hello World');\n```",
    title: "",
    githubUrl: "",
    slug: "",
    uid: "",
    username: "",
    published: true,
    tags: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    summary: "",
  };

  return (
    <AuthWrapper>
      <PostEdit post={postData} isEdit={false} />
    </AuthWrapper>
  );
}
