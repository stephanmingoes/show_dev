import {
  Heading,
  Stack,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { debounce, kebabCase } from "lodash";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { PrimaryColor } from "../constants";
import { firestore } from "../lib/firebase";
import { UserContext } from "../lib/userContext";
import { Post } from "../types";

import DebounceChecker from "./DebounceChecker";

export default function PostEdit({
  post,
  isEdit,
}: {
  post: Post;
  isEdit: boolean;
}) {
  const { user, username } = useContext(UserContext);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isTitleLoading, setIsTitleLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const [postData, setPostData] = useState<Post>({
    content: post.content,
    title: post.title,
    githubUrl: post.githubUrl,
    slug: "",
    uid: "",
    username: "",
    published: post.published,
    tags: post.tags,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    summary: post.summary,
  });

  const slug = encodeURI(kebabCase(postData.title.trim()));

  // Handle Form Change
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    if (name == "title") setIsTitleLoading(true);
    setPostData((prev) => ({ ...prev, [name]: value }));
  }

  // Update UID
  useEffect(() => {
    if (user) setPostData((prev) => ({ ...prev, uid: user.uid }));
    if (username) setPostData((prev) => ({ ...prev, username: username }));
  }, [user, username]);

  // Check if slug is valid
  const checkSlug = useCallback(
    debounce(async (slug: string) => {
      if (slug.length < 3) {
        setIsTitleLoading(false);
        setIsTitleValid(false);
        return;
      }

      try {
        const docRef = doc(firestore, `users/${user?.uid}/posts`, slug);
        const docSnap = await getDoc(docRef);

        if (isEdit && docSnap.exists() && router.query.slug == slug) {
          setIsTitleValid(true);
        } else {
          setIsTitleValid(!docSnap.exists());
        }
      } catch (error) {
        setIsTitleValid(false);
        console.log(error);
      } finally {
        setIsTitleLoading(false);
      }
    }, 3000),
    []
  );
  useEffect(() => {
    checkSlug(slug);
  }, [checkSlug, slug]);

  useEffect(() => {
    if (isEdit) setIsTitleLoading(true);
  }, [isEdit]);
  //   Handle Submit

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { createdAt, ...newDoc } = postData;
      const data = isEdit ? newDoc : postData;
      await setDoc(
        doc(firestore, `users/${user?.uid}/posts`, slug),
        {
          ...data,
          slug,
        },
        { merge: true }
      );
      toast({
        title: "Your Post was saved",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push({ pathname: `/show/${username}/${slug}` });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  // Actual JSX
  return (
    <>
      <Heading size={"lg"}>Create a New Post</Heading>
      <br />
      <form onSubmit={handleSubmit}>
        <Stack id="creat-post-form">
          <Input
            type="text"
            placeholder="Title - This will be on the preview and not on the blog"
            size={"lg"}
            required
            name="title"
            value={postData.title}
            onChange={handleChange}
          />
          <DebounceChecker
            name={slug}
            isValid={isTitleValid}
            loading={isTitleLoading}
          />
          <Input
            type="url"
            placeholder="Github URL (Optional)"
            size={"lg"}
            name="githubUrl"
            value={postData.githubUrl}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Tags Seperated by commas, Eg. react, javascript, nextJS"
            size={"lg"}
            required
            name="tags"
            value={postData.tags}
            onChange={handleChange}
          />
          <Textarea
            placeholder="Brief summary of your Project - This will be on the preview and not on the blog"
            fontSize={"1.1rem"}
            height="10rem"
            required
            name="summary"
            value={postData.summary}
            onChange={handleChange}
          />
          <MdEditor
            language="en-US"
            modelValue={postData.content}
            onChange={(val) => {
              setPostData((prev) => ({ ...prev, content: val }));
            }}
          />
          <ButtonGroup>
            <Button
              color={"white"}
              bg={PrimaryColor}
              type="submit"
              disabled={isTitleLoading || !isTitleValid}
            >
              Save
            </Button>
            {isEdit && (
              <Button color="white" bg="red.500">
                Delete Post
              </Button>
            )}
          </ButtonGroup>
        </Stack>
      </form>
    </>
  );
}
