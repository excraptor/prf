import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { LoginService } from './login.service';
import { Item } from './Item';

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
    let res: Item[] = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      const item: Item = {
        id: doc.id,
        name: doc.data()['name'],
        cost: doc.data()['cost'],
        availableQuantity: doc.data()['availableQuantity'] ?? doc.data()['quantity']
      };
      res.push(item)
    });
    return res;
  }

  async getAdmins() {
    const querySnapshot = await getDocs(collection(this.db, 'admin'));
    return querySnapshot;
  }

  async deleteItem(id: string) {
    console.log(id);
    await deleteDoc(doc(this.db, 'item', id));
  }

  updateItems(items: Item[]) {
    items.forEach(async i => {
      await this.updateItem(i);
    })
  }

  async updateItem(i: Item) {
    const docRef = doc(this.db, 'item', i.id);
    console.log(i);
    await updateDoc(docRef, {
      availableQuantity:  i.availableQuantity,  
    });
  }

}
