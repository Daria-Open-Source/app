//src/fireauth/test.ts
import { loginUser, registerUser } from "./authservice";

const runFullAuthFlow = async () => {
  // Create a unique email for every test run
  const uniqueEmail = `user_${Math.floor(Math.random() * 10000)}@example.org`;
  const password = "password123";

  try {
    console.log(`🚀 Step 1: Registering new user... (${uniqueEmail})`);
    const newUser = await registerUser(uniqueEmail, password);
    console.log("✅ Registration Success! UID:", newUser.uid);

    console.log("🚀 Step 2: Attempting login with new credentials...");
    const loggedInUser = await loginUser(uniqueEmail, password);
    console.log("✅ Login Success! Verified UID:", loggedInUser.uid);

    console.log("\n🎊 Full Auth Flow Verified: Connection is solid.");
  } catch (err: any) {
    console.log("❌ Test failed!");
    
    //Specific error handling 
    if (err.code === 'auth/email-already-in-use') {
      console.log("Error: That email is already taken in the Daria console.");
    } else if (err.code === 'auth/operation-not-allowed') {
      console.log("Error: Email/Password provider is not enabled in Firebase Console.");
    } else {
      console.log("Error Details:", err.message);
    }
  }
};

runFullAuthFlow();