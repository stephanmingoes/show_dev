import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../lib/userContext";
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username } = useContext(UserContext);

  if (!username)
    <Link href={"/auth"}>
      <Button>Login</Button>
    </Link>;

  return <>{children}</>;
}
