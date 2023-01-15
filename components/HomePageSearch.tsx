import { Button, Flex, Input, Spacer } from "@chakra-ui/react";
import React from "react";
import { PrimaryColor } from "../constants";

export default function HomePageSearch() {
  return (
    <div>
      <form>
        <Flex>
          {" "}
          <Input placeholder="Search Coming soon" size={"lg"} disabled />
          <Spacer />
          <Button
            ml={19}
            height="-moz-max-content"
            bg={PrimaryColor}
            color={"white"}
            disabled
          >
            Search
          </Button>
        </Flex>
      </form>
    </div>
  );
}
