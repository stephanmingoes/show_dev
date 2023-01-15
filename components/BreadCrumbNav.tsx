import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";
import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

export default function BreadCrumbNav() {
  const router = useRouter();
  const paths = router.asPath.split("/").filter(Boolean);
  let url: string = "/";
  return (
    <>
      <Breadcrumb
        bg={"#f2f2ff"}
        p="1rem"
        spacing="8px"
        display={"flex"}
        rounded="lg"
        separator={
          <FiChevronRight style={{ color: "grey", fontSize: "1.5rem" }} />
        }
        mb={"1rem"}
      >
        {paths.map((path, index) => {
          url += path + "/";
          return (
            <BreadcrumbItem key={index}>
              <Link href={url}>
                <Text color={"#8B39FF"} fontSize="larger">
                  {" "}
                  {capitalize(path)}
                </Text>
              </Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
}
