import { auth, firestore } from "./firebase";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";
export function UserHook() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    let unsubscribe;
    setUsername(null);
    if (!user) return;

    unsubscribe = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
      setUsername(doc.data()?.username);
    });

    return unsubscribe;
  }, [user]);
  return { user, username };
}
