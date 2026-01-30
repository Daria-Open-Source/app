//src/fireauth/authService.js
import { auth, db } from "./config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, type User} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const registerUser = async(email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  //Add to firestore database
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    role: "user",           
    createdAt: serverTimestamp(), 
    lastActive: serverTimestamp(),
    isNewUser: true
  });

  return user;
}
