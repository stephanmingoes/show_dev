import { User } from "firebase/auth";
import { User as FirebaseUser, UserContextType } from "../types/index";
import { createContext } from "react";
import { DocumentData } from "firebase/firestore";
export const UserContext = createContext<UserContextType>({
  user: null,
  username: null,
  firebaseUser: null,
});
