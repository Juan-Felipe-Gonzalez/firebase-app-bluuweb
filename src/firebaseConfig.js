import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmEW6PK1RfJKh2ilOXvPk8cJHSxzmjxac",
  authDomain: "fir-app-bluuweb.firebaseapp.com",
  projectId: "fir-app-bluuweb",
  storageBucket: "fir-app-bluuweb.firebasestorage.app",
  messagingSenderId: "232239875933",
  appId: "1:232239875933:web:cbfd9cf411e3721aa58ab4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

export { auth, db };
