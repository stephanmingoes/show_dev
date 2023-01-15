import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../lib/userContext";
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username } = useContext(UserContext);
  const router = useRouter();

  if (!username) router.push("/auth");

  return <>{children}</>;
}
