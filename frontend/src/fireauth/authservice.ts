//src/fireauth/authService.js
import { auth } from "./config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, type User} from "firebase/auth";

export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const registerUser = async(email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}
