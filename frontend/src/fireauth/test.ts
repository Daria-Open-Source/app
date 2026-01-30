//src/fireauth/test.ts
import { loginUser, registerUser } from "./authservice";
import { db } from "./config"; // Ensure db is exported from your config
import { doc, getDoc } from "firebase/firestore"; 

const runFullAuthFlow = async () => {
  const uniqueEmail = `user_${Math.floor(Math.random() * 10000)}@example.org`;
  const password = "password123";

  try {
    // STEP 1: Register (which now includes the Firestore write)
    console.log(`🚀 Step 1: Registering & Creating Firestore Profile... (${uniqueEmail})`);
    const newUser = await registerUser(uniqueEmail, password);
    console.log("✅ Auth Success! UID:", newUser.uid);

    // STEP 2: Verify Firestore Write
    console.log("🚀 Step 2: Verifying Firestore Metadata...");
    const userDocRef = doc(db, "users", newUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log("✅ Firestore Success! Found metadata:", userDocSnap.data());
    } else {
      throw new Error("Firestore document not found! Check your registerUser function.");
    }

    // STEP 3: Login
    console.log("🚀 Step 3: Attempting login with new credentials...");
    const loggedInUser = await loginUser(uniqueEmail, password);
    console.log("✅ Login Success! Verified UID:", loggedInUser.uid);

    console.log("\n🎊 Full Auth & Database Flow Verified!");
  } catch (err: any) {
    console.log("❌ Test failed!");
    console.log("Error Details:", err.message || err.code);
  }
};

runFullAuthFlow();