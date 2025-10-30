// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlVlEX1bb0bkYWOMt23Eple_PlCLbCaNk",
  authDomain: "user-management-app-28ac3.firebaseapp.com",
  projectId: "user-management-app-28ac3",
  storageBucket: "user-management-app-28ac3.firebasestorage.app",
  messagingSenderId: "1044383758539",
  appId: "1:1044383758539:web:490dd231659897aeb5834e",
  measurementId: "G-J07BZCYXVS"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
