import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../lib/firebase";

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut(auth).catch((err) => console.log(err))}>
      Logout
    </Button>
  );
}
