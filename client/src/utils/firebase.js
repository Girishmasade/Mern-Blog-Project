// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "mern-blog-project-8663b.firebaseapp.com",
  projectId: "mern-blog-project-8663b",
  storageBucket: "mern-blog-project-8663b.firebasestorage.app",
  messagingSenderId: "739377479493",
  appId: "1:739377479493:web:0197f325710ba4baec482c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}