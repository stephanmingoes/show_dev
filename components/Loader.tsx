import { Spinner } from "@chakra-ui/react";
import React from "react";
import { PrimaryColor } from "../constants";

export default function Loader({ show }: { show: boolean }) {
  return show ? (
    <>
      <Spinner color={PrimaryColor} />
    </>
  ) : null;
}
