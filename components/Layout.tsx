import { Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container height="full" maxWidth="container.lg">
        <Navbar />
        <br />
        {children}
        <br />
        <br />
      </Container>
    </>
  );
}
