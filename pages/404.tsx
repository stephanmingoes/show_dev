import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Error404() {
  return (
    <>
      {" "}
      <Heading size="lg" mb="1rem">
        Oh no, looks like you&apos;re lost click this house to go back 👉{" "}
        <Link href="/show">🏠</Link>
      </Heading>
      <iframe
        src="https://giphy.com/embed/1EmBoG0IL50VIJLWTs"
        allowFullScreen
      ></iframe>
    </>
  );
}
