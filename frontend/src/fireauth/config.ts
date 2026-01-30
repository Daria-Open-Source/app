//src/fireauth/config.ts
import { initializeApp, type FirebaseApp, type FirebaseOptions} from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore"; 
import dotenv from "dotenv";
import path from "path";

//Process.cwd() to point exactly to the folder your terminal is in
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

// Use process.env for the terminal test
const env = process.env;
console.log("🛠️ API Key:", process.env.VITE_FIREBASE_API_KEY?.substring(0, 10) + "...");
console.log("🛠️ Project ID:", process.env.VITE_FIREBASE_PROJECT_ID);
//Create config
const firebaseConfig: FirebaseOptions = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

//Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

//Export the auth service for use in authService.ts
export const auth: Auth = getAuth(app);

//Get firestore db
export const db : Firestore = getFirestore(app); 