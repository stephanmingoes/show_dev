import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContext } from "../lib/userContext";

import { UserHook } from "../lib/hooks";
export default function App({ Component, pageProps }: AppProps) {
  const { user, username, firebaseUser } = UserHook();
  return (
    <ChakraProvider>
      <UserContext.Provider
        value={{ user: user, username: username, firebaseUser: firebaseUser }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </ChakraProvider>
  );
}
