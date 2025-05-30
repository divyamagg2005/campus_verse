
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// PLEASE ENSURE THESE VALUES ACCURATELY MATCH YOUR FIREBASE PROJECT SETTINGS
const firebaseConfig = {
  apiKey: "AIzaSyAtqN9Ou8QhOnKtGzL1iV6L_f8iFW0e2uw",
  authDomain: "campus-verse.firebaseapp.com",
  projectId: "campus-verse",
  storageBucket: "campus-verse.firebasestorage.app", // Using the value you provided
  messagingSenderId: "799353902994",
  appId: "1:799353902994:web:6696eca6ae7ecf5e87934b",
  measurementId: "G-8YE1JWJLGF"
};

// Initialize Firebase
let app: FirebaseApp;
let authInstance: Auth;
let dbInstance: Firestore;
let storageInstance: FirebaseStorage;
let analyticsInstance: Analytics | undefined;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    // Initialize Analytics only on the client side
    analyticsInstance = getAnalytics(app);
  }
} else {
  app = getApp();
  if (typeof window !== 'undefined' && typeof analyticsInstance === 'undefined') {
     // Ensure analytics is initialized if app was already initialized (e.g. HMR)
    analyticsInstance = getAnalytics(app);
  }
}

authInstance = getAuth(app);
dbInstance = getFirestore(app);
storageInstance = getStorage(app);

// Export the instances with desired names
export { app, authInstance as auth, dbInstance as db, storageInstance as storage, analyticsInstance as analytics };
