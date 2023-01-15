import { Avatar, Box, Flex, Text, Link as LinkC } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Post, User } from "../types";
import Metatags from "./SEOMetaTags";
import { AiOutlineLink } from "react-icons/ai";
import MarkDownRenderer from "./MarkDownRenderer";

export default function BlogPost({ user, post }: { user: User; post: Post }) {
  return (
    <>
      <Metatags title={post?.title} description={post?.summary} />
      <Box>
        <Box mb={"10"}>
          <Flex mb="4">
            <Avatar src={user?.photoURL} size="md" mr={"3"} />
            <div>
              <Text fontWeight={"bold"}>{user?.displayName}</Text>
              <Link href={"/show/" + user?.username}>
                <Text fontSize={"sm"} color="gray.500">
                  @{user?.username}
                </Text>
              </Link>
            </div>
          </Flex>
          <Text color={"gray.500"} mt={2} mb={2}>
            {post?.createdAt as string}
          </Text>
          {post?.githubUrl && (
            <LinkC href={post?.githubUrl} display="block" color={"gray.500"}>
              {"Github"}
              <AiOutlineLink style={{ display: "inline" }} />
            </LinkC>
          )}
        </Box>

        <Box>
          <MarkDownRenderer markdown={post.content} />
        </Box>
      </Box>
    </>
  );
}
