import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private authService: LoginService) { }

  firebaseConfig = {
    apiKey: "AIzaSyDHkTVrcxc0oFOV8Amsc9vErt-y5jwwiL8",
    authDomain: "prf-kotprog-7d9a6.firebaseapp.com",
    projectId: "prf-kotprog-7d9a6",
    storageBucket: "prf-kotprog-7d9a6.appspot.com",
    messagingSenderId: "192272081286",
    appId: "1:192272081286:web:f1c10b90529a1500024c07",
    measurementId: "G-JDPKQ5SVYC"
  };


  app = initializeApp(this.firebaseConfig);
  db = getFirestore(this.app);

  async addItem(item: any) {
    try {
      const docRef = await addDoc(collection(this.db, 'item'), item);
      console.log("document added with id: " + docRef.id);
    } catch(e) {
      console.error("error adding document: ", e);
    }
  }

  async getAllItems() {
    const querySnapshot = await getDocs(collection(this.db, 'item'));
    // TODO return them
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
    return querySnapshot;
  }

  async getAdmins() {
    const querySnapshot = await getDocs(collection(this.db, 'admin'));
    return querySnapshot;
  }

  async deleteItem(item: any) {
    await deleteDoc(doc(this.db, 'item', item['id']));
  }

}
