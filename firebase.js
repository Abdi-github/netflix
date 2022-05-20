// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FB_API_ID,
  FB_API_KEY,
  FB_AUTHDOMAIN,
  FB_MESSAGING_SENDERID,
  FB_PROJECTID,
  FB_STORAGE_BUCKET,
} from "./helpers/global-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: "netflix-94589.firebaseapp.com",
  projectId: FB_PROJECTID,
  storageBucket: "netflix-94589.appspot.com",
  messagingSenderId: FB_MESSAGING_SENDERID,
  appId: FB_API_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;
