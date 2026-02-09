//src/firestore/config.js
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

if (!admin.apps.length) {
    admin.initializeApp({
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    });
}

export const db = admin.firestore();
export const auth = admin.auth();