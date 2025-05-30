
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtqN9Ou8QhOnKtGzL1iV6L_f8iFW0e2uw",
  authDomain: "campus-verse.firebaseapp.com",
  projectId: "campus-verse",
  storageBucket: "campus-verse.appspot.com", // Corrected based on common Firebase setup, if firebasestorage.app is preferred, let me know.
  messagingSenderId: "799353902994",
  appId: "1:799353902994:web:6696eca6ae7ecf5e87934b",
  measurementId: "G-8YE1JWJLGF"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | undefined;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    // Initialize Analytics only on the client side
    analytics = getAnalytics(app);
  }
} else {
  app = getApp();
  if (typeof window !== 'undefined' && !analytics) {
     // Ensure analytics is initialized if app was already initialized (e.g. HMR)
    analytics = getAnalytics(app);
  }
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

export { app, auth, db, storage, analytics };
