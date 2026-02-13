//src/infra/gcp/firestore/config.js
import admin  from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

//Resolve path
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
        process.cwd(), 
        process.env.GOOGLE_APPLICATION_CREDENTIALS
    );
} 

//If firebase instance is not up, initialize app
if (!admin.apps.length) {
    //Initialize app
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.GCP_PROJECT_ID,
    });
}

//Export db/auth for use in service
export const db = admin.firestore();
export const auth = admin.auth();