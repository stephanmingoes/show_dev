import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { useContext } from "react";
import { UserContext } from "../lib/userContext";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { PrimaryColor } from "../constants";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  const menuLinks = [
    ["Create Post", "/admin/create"],
    ["Profile", `/admin`],
    ["Home", "/show"],
  ];
  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        // bg={"#f7f7ff"}
        style={{ padding: "1rem 0rem" }}
      >
        <Box>
          <Link href="/show">
            <Heading fontWeight={"extrabold"}>
              Show_
              <Text as={"span"} color={PrimaryColor}>
                Dev
              </Text>
            </Heading>
          </Link>
        </Box>
        <Spacer />
        {username && (
          <>
            <Menu>
              <MenuButton as={Button} bg={"#e0e0ff"}>
                <Avatar name={username} size="lg" src={user?.photoURL!} />
              </MenuButton>
              <MenuList>
                {menuLinks.map((item) => (
                  <Link href={item[1]} key={item[0]}>
                    <MenuItem>{item[0]}</MenuItem>
                  </Link>
                ))}

                <MenuItem
                  onClick={() => {
                    signOut(auth)
                      .then(() => router.push("/"))
                      .catch((err) => console.log(err));
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
        {!username && (
          <Link href={"/auth"}>
            <Button
              backgroundColor={PrimaryColor}
              color="white"
              _hover={{
                bg: "#b951ff",
              }}
            >
              Login with Github
            </Button>
          </Link>
        )}
      </Flex>
    </>
  );
}
