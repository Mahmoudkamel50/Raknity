import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2dC_GxQ6j7icoDVcBiX-ePbBX8lqhBvw",
  authDomain: "raknity-9a842.firebaseapp.com",
  projectId: "raknity-9a842",
  storageBucket: "raknity-9a842.appspot.com",
  messagingSenderId: "806300122126",
  appId: "1:806300122126:web:63a65254ab7cfa26de905f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };