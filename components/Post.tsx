import {
  Card,
  CardFooter,
  CardHeader,
  Button,
  Heading,
  Text,
  CardBody,
  ButtonGroup,
  Stack,
  Badge,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Post as PostType } from "../types";

export default function Post({
  post,
  admin,
}: {
  post: PostType;
  admin: boolean;
}) {
  return (
    <Card boxShadow={"md"}>
      <CardHeader>
        <Heading size="md"> {post?.title}</Heading>
        {post.username && (
          <>
            <Link href={`/show/${post.username}`}>@{post.username}</Link>
          </>
        )}

        <Text color={"gray.500"} mt={2}>
          {post?.createdAt as string}
        </Text>
        <Stack direction={"row"} mt={6} wrap="wrap">
          {post?.tags?.split(",").map((tag, index) => (
            <Badge
              key={index}
              rounded="full"
              px={2}
              py={1}
              colorScheme="green"
              fontWeight={"400"}
            >
              #{tag}
            </Badge>
          ))}
        </Stack>
      </CardHeader>
      <CardBody>
        <Text noOfLines={3}>{post?.summary}</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing={"2"}>
          <Link
            style={{ textDecoration: "none" }}
            href={`/show/${post?.username}/${post?.slug}`}
          >
            {" "}
            <Button>View More👉</Button>
          </Link>
          {admin && (
            <Link
              style={{ textDecoration: "none" }}
              href={`/admin/${post?.slug}`}
            >
              {" "}
              <Button>Edit ✍️</Button>
            </Link>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
