import { auth } from "../dataBase/configuration";
import { signInWithEmailAndPassword } from "firebase/auth";

async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

export {signIn};