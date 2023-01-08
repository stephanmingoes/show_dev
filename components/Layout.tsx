import { Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container
        style={{ height: "100vh", marginTop: "2rem" }}
        maxWidth="container.xl"
      >
        {children}
      </Container>
    </>
  );
}
