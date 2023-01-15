import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GithubLoginButton } from "react-social-login-buttons";
import { signInWithPopup } from "firebase/auth";
import { auth, firestore, GithubProvider } from "../../lib/firebase";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../lib/userContext";
import { PrimaryColor } from "../../constants";
import { debounce } from "lodash";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import DebounceChecker from "../../components/DebounceChecker";

export default function Auth() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  if (user && username) router.push("/show");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "3rem",
      }}
    >
      <Heading>Sign in📝</Heading>
      <br />
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="2"
      >
        {user && !username ? <UserForm /> : <GithubLoginInButtonComponent />}
      </Box>
    </div>
  );
}

export function GithubLoginInButtonComponent() {
  async function Login() {
    try {
      await signInWithPopup(auth, GithubProvider);
    } catch (error) {
      console.log(error);
    }
  }
  return <GithubLoginButton onClick={async () => await Login()} />;
}

function UserForm() {
  const { user } = useContext(UserContext);
  const toast = useToast();

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [uservals, setUserVals] = useState({
    username: "",
    about: "",
    actualname: user?.displayName ?? "",
    githubusername: "",
    tags: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserVals((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const batch = writeBatch(firestore);
      const usernameDoc = doc(firestore, "usernames", uservals.username);
      batch.set(usernameDoc, { uid: user!.uid });

      const userDoc = doc(firestore, "users", user!.uid);
      batch.set(userDoc, {
        username: uservals.username,
        photoURL: user?.photoURL,
        displayName: uservals.actualname,
        githubusername: uservals.githubusername,
        about: uservals.about,
        tags: uservals.tags,
      });

      await batch.commit();

      toast({
        title: "Account created.",
        description: "Start looking around 👀",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUserVals({
        username: "",
        about: "",
        actualname: user?.displayName ?? "",
        githubusername: "",
        tags: "",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong.",
        description: "Oh no, your account wasnt created ☹️",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const val = value.toLocaleLowerCase();

    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setUserVals((prev) => ({ ...prev, [name]: val }));
      setUsernameLoading(false);
      setIsUsernameValid(false);
    }

    if (re.test(val)) {
      setUserVals((prev) => ({ ...prev, [name]: val }));
      setUsernameLoading(true);
      setIsUsernameValid(false);
    }
  }

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length < 3) return;

      try {
        const docRef = doc(firestore, "usernames", username);
        const docSnap = await getDoc(docRef);

        setIsUsernameValid(!docSnap.exists());
        setUsernameLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 3000),
    []
  );

  useEffect(() => {
    checkUsername(uservals.username);
  }, [checkUsername, uservals.username]);

  return (
    <form onSubmit={handleSubmit} style={{ minWidth: "300px" }}>
      {" "}
      <VStack spacing={4} align="stretch">
        {" "}
        <Text fontSize={"2xl"}>Next steps 🪜</Text>
        {/* ------------------- */}
        <FormLabel>Username</FormLabel>
        <Input
          name="username"
          onChange={handleUsernameChange}
          type={"text"}
          value={uservals.username}
          placeholder="Enter username here"
          required
        />
        <DebounceChecker
          name={uservals.username}
          isValid={isUsernameValid}
          loading={usernameLoading}
        />
        {/* ------------------- */}
        <FormLabel>About you</FormLabel>
        <Input
          type="text"
          name="about"
          onChange={handleChange}
          value={uservals.about}
          placeholder="Eg - Software Developer"
          required
        />
        {/* ------------------- */}
        <FormLabel>Actual Name</FormLabel>
        <Input
          type="text"
          name="actualname"
          onChange={handleChange}
          value={uservals.actualname}
          placeholder="Enter name here"
          disabled={user?.displayName ? true : false}
        />
        {/* ------------------- */}
        <FormLabel>Github Username</FormLabel>
        <Input
          type="text"
          name="githubusername"
          onChange={handleChange}
          value={uservals.githubusername}
          placeholder="Github Username"
          required
        />
        {/* ------------------- */}
        <FormLabel>Tags (Comma Separated)</FormLabel>
        <Input
          type="text"
          name="tags"
          onChange={handleChange}
          value={uservals.tags}
          placeholder="Example - react, nextjs, firebase"
          required
        />
        {/* ------------------- */}
        <Button
          disabled={!isUsernameValid || usernameLoading}
          type="submit"
          bg={PrimaryColor}
          color="white"
          _hover={{
            bg: "#b951ff",
          }}
        >
          Submit 💨
        </Button>
      </VStack>
    </form>
  );
}
