import { auth, firestore } from "./firebase";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { User } from "../types";
export function UserHook() {
  const [user] = useAuthState(auth);
  const [firebaseUser, setUsername] = useState<User | null | undefined>(null);

  useEffect(() => {
    let unsubscribe;
    setUsername(null);
    if (!user) return;

    unsubscribe = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
      setUsername(doc.data() as User);
    });

    return unsubscribe;
  }, [user]);
  return { user, username: firebaseUser?.username, firebaseUser: firebaseUser };
}
