import { Button, Card, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import Post from "./Post";
import { Post as PostType, User } from "../types";
import { PrimaryColor } from "../constants";
import Loader from "./Loader";

export default function PostFeed({
  posts,
  admin,
  isHomePage,
  loading,
  postsEnd,
  getMorePosts,
}: {
  posts: PostType[] | null;
  admin?: boolean;
  isHomePage?: boolean;
  loading?: boolean;
  postsEnd?: boolean;
  getMorePosts?: () => {};
}) {
  if (!posts?.length) return <Text>No posts, try checking back later 😉</Text>;
  return (
    <SimpleGrid spacing={4} columns={{ base: 1, md: 2, lg: 3 }}>
      {posts?.map((post) => (
        <Post key={post.content} post={post} admin={admin ?? false} />
      ))}

      {isHomePage && (
        <Card
          boxShadow={"md"}
          bg="#f2f2ff"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
        >
          {" "}
          <Loader show={loading ?? false} />
          {postsEnd == false
            ? !loading && (
                <Button
                  onClick={getMorePosts}
                  width={"max-content"}
                  color="white"
                  bg={PrimaryColor}
                  mt={4}
                  mb={4}
                >
                  Load More ➕
                </Button>
              )
            : "That's it 🤷‍♂️"}
        </Card>
      )}
    </SimpleGrid>
  );
}
