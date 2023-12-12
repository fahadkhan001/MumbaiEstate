// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-3d362.firebaseapp.com",
  projectId: "mern-estate-3d362",
  storageBucket: "mern-estate-3d362.appspot.com",
  messagingSenderId: "2941018396",
  appId: "1:2941018396:web:5e103072c241863b1adad9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);