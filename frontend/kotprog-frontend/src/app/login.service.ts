import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  firebaseConfig = {
    apiKey: "AIzaSyDHkTVrcxc0oFOV8Amsc9vErt-y5jwwiL8",
    authDomain: "prf-kotprog-7d9a6.firebaseapp.com",
    projectId: "prf-kotprog-7d9a6",
    storageBucket: "prf-kotprog-7d9a6.appspot.com",
    messagingSenderId: "192272081286",
    appId: "1:192272081286:web:f1c10b90529a1500024c07",
    measurementId: "G-JDPKQ5SVYC"
  };


  private firebase = initializeApp(this.firebaseConfig);
  private auth = getAuth()

  async getUsers(db: Firestore) {
      const userCol = collection(db, 'user')
      const userSnapshots = await getDocs(userCol)
      const userList = userSnapshots.docs.map(doc => doc.data())
      return userList
  }

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log("sikeres signup");
        return true;
      })
      .catch((error) => {
        console.log("something went wrong: ", error);
      });
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return false;
      });
  }
  getUserSignedIn() {
    console.log(this.auth.currentUser);
    return this.auth.currentUser;
  }

  async signOut() {
    try {
      await signOut(this.auth);
      console.log("signout successful");
      return true;
    } catch (error) {
      console.log("signout unsuccesful", error);
      return false;
    }
  }
}
