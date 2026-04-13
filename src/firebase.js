// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNmsZefRsdTTTH6Hf67maPmLlhkWgXSyM",
  authDomain: "face-attendance-react.firebaseapp.com",
  projectId: "face-attendance-react",
  storageBucket: "face-attendance-react.firebasestorage.app",
  messagingSenderId: "537387493463",
  appId: "1:537387493463:web:bc2fd6ac3260d5a7d11b12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getAuth } from "firebase/auth";
import app from "./firebase"; // tumhara firebase.js config

const auth = getAuth(app);
export { auth };
