import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../lib/userContext";
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, user } = useContext(UserContext);
  const router = useRouter();

  if (!username || !user) router.push("/auth");

  useEffect(() => {
    return;
  }, []);

  return <>{children}</>;
}
