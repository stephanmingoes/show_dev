import {
  FirebaseApp,
  initializeApp,
  getApps,
  FirebaseOptions,
} from "firebase/app";
import { GithubAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  collectionGroup,
  Timestamp,
  startAfter,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAGC2btT0-64yGSNBLtuUxn7HNNAHjU78k",
  authDomain: "devpro-abd67.firebaseapp.com",
  projectId: "devpro-abd67",
  storageBucket: "devpro-abd67.appspot.com",
  messagingSenderId: "1096315569910",
  appId: "1:1096315569910:web:ea966a97fe0e9adb968ed7",
  measurementId: "G-ES26P444RE",
};
let app: FirebaseApp;

if (!getApps().length) app = initializeApp(firebaseConfig);

export const auth = getAuth(app!);
export const firestore = getFirestore(app!);
export const storage = getStorage(app!);
export const GithubProvider = new GithubAuthProvider();

export async function getUserFromFirestoreWithUsername(username: string) {
  try {
    const ref = collection(firestore, "users");
    const q = query(ref, where("username", "==", username), limit(1));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPostsFromFireStore(path: string) {
  try {
    const q = query(
      collection(firestore, path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserPostFromFireStore(path: string, slug: string) {
  try {
    const q = query(
      collection(firestore, path, "posts"),
      where("published", "==", true),
      where("slug", "==", slug),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPostFromFireStore(_limit: number) {
  try {
    const q = query(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(_limit)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (error) {
    console.log(error);
  }
}

export async function loadMorePostsFromFirestore(
  _limit: number,
  date: Timestamp
) {
  try {
    const q = query(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(date),
      limit(_limit)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPostFromFireStoreWithoutLimit() {
  try {
    const q = query(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (error) {
    console.log(error);
  }
}
