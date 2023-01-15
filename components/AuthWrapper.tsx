import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../lib/userContext";
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, user } = useContext(UserContext);

  if (!username || !user)
    return (
      <Box maxWidth={"xs"}>
        <Link href="/auth">Login</Link>
      </Box>
    );

  return <>{children}</>;
}
