import {
  FirebaseApp,
  initializeApp,
  getApps,
  FirebaseOptions,
} from "firebase/app";
import { GithubAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
