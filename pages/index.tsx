import Head from "next/head";
import { PrimaryColor } from "../constants";
import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Show_Dev</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={"extrabold"}
            fontSize={{ base: "6xl", sm: "4xl", md: "8xl" }}
            lineHeight={"110%"}
          >
            Show_
            <Text as={"span"} color={PrimaryColor}>
              Dev
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize="2xl">
            Simple Blog Website for developers to share, showcase, and promote
            their work, gain inspiration, and find opportunities to collaborate
            and grow.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Link href={"/show"}>
              <Button
                colorScheme={PrimaryColor}
                bg={PrimaryColor}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "#b951ff",
                }}
              >
                Join The Community
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
