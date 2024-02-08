import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIYPbc27_5YSe2m7yl0mxeZybHFDylTk0",
  authDomain: "house-marketplace-app-84165.firebaseapp.com",
  projectId: "house-marketplace-app-84165",
  storageBucket: "house-marketplace-app-84165.appspot.com",
  messagingSenderId: "240358707433",
  appId: "1:240358707433:web:02daa014f42b28d0076078"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();