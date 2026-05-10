import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNmsZefRsdTTTH6Hf67maPmLlhkWgXSyM",
  authDomain: "face-attendance-react.firebaseapp.com",
  projectId: "face-attendance-react",
  storageBucket: "face-attendance-react.firebasestorage.app",
  messagingSenderId: "537387493463",
  appId: "1:537387493463:web:bc2fd6ac3260d5a7d11b12"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
