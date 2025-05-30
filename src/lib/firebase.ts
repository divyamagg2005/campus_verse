
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// IMPORTANT: Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "YOUR_AUTH_DOMAIN", // process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "YOUR_PROJECT_ID", // process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "YOUR_STORAGE_BUCKET", // process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "YOUR_APP_ID", // process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

export { app, auth, db, storage };
