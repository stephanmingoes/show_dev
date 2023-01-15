import {
  Center,
  Box,
  Stack,
  Avatar,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import React from "react";
import { User } from "../types";

export default function UserProfile({ user }: { user: User }) {
  return (
    <Center py={6}>
      <Box
        w={"full"}
        boxShadow={"md"}
        rounded={"md"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"2xl"}
          src={user?.photoURL}
          mb={4}
          mt={6}
          pos={"relative"}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {user?.displayName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          @{user?.username}
        </Text>
        {user?.githubusername && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <a href={`https://www.github.com/${user.githubusername}`}>
              {" "}
              <AiFillGithub size={30} />
            </a>
          </div>
        )}

        <Text textAlign={"center"} color={"gray.600"} px={3}>
          {user?.about}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          {user?.tags.split(",").map((tag, index) => (
            <Badge
              key={index}
              px={2}
              py={1}
              bg={"#8b39ff"}
              color="white"
              fontWeight={"400"}
            >
              #{tag}
            </Badge>
          ))}
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}></Stack>
      </Box>
    </Center>
  );
}
