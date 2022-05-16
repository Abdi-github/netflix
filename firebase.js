// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc5QT31zit6y7-1bS8EwQ4w2G-fSUvQSk",
  authDomain: "netflix-94589.firebaseapp.com",
  projectId: "netflix-94589",
  storageBucket: "netflix-94589.appspot.com",
  messagingSenderId: "583437521011",
  appId: "1:583437521011:web:f540c6cf4d6ee248061a06",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth();

export default app;
