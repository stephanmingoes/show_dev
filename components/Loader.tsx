import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React from "react";

export default function Loader({ show }: { show: boolean }) {
  return show ? (
    <>
      <CircularProgress value={40} color="green.400">
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>
    </>
  ) : null;
}
