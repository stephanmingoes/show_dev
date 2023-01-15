import { User as FirebaseUser } from "firebase/auth";
import { FieldValue } from "firebase/firestore";
export type Post = {
  summary: string;
  content: string;
  createdAt: string | FieldValue | Date;
  updatedAt: string | FieldValue | Date;
  githubUrl: string;
  published: boolean;
  slug: string;
  tags: string;
  title: string;
  uid: string;
  username: string;
};

export type User = {
  tags: string;
  about: string;
  displayName: string;
  githubusername: string;
  photoURL: string;
  username: string;
};

export type UserContextType = {
  user: FirebaseUser | null | undefined;
  firebaseUser: User | null | undefined;
  username: string | null | undefined;
};
