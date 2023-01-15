import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../lib/userContext";
import { GithubLoginInButtonComponent } from "../pages/auth";
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, user } = useContext(UserContext);

  if (!username || !user)
    return (
      <Box maxWidth={"xs"}>
        <GithubLoginInButtonComponent />
      </Box>
    );

  return <>{children}</>;
}
