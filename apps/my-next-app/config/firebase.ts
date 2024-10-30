import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "ebuddy-dfdc5.firebaseapp.com",
  projectId: "ebuddy-dfdc5",
  storageBucket: "ebuddy-dfdc5.appspot.com",
  messagingSenderId: "991446937366",
  appId: "1:991446937366:web:36afa50d06122d6d022a37",
  measurementId: "G-8NR5RZX19L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

// Connect to emulators in development
if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { app, db, auth };
