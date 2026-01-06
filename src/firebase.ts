// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC4ARr0wUTBJz1m-myCaTbnjqUBpo90BSU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-46a30.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://portfolio-46a30-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-46a30",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-46a30.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "108318929074",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:108318929074:web:03f3a8c66955ccf04719ab",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ECDVELFZRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics seulement en production et dans le navigateur
let analytics;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  analytics = getAnalytics(app);
}

// Exporter Firestore et Auth
export const db = getFirestore(app); // ✅ C'est bien Firestore
export const auth = getAuth(app);
export { analytics };
export default app;