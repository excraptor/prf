import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuerySnapshot, DocumentData } from 'firebase/firestore/lite';
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storage: StorageService, private auth: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getAllItems();
    this.setAdmin()
  }

  items: DocumentData[] = []
  admin = false;
  name = "";
  cost: number | undefined;
  quantity: number | undefined;


  async getAllItems() {
    this.items = [];
    const allItems = await this.storage.getAllItems();
    allItems.forEach((doc) => this.items.push(doc.data()))
  }

  getUserSignedIn() {
    return this.auth.getUserSignedIn();
  }

  async setAdmin() {
    const admins = await this.storage.getAdmins()
    admins.forEach((doc) => {
      if(doc.data()['email'] == this.getUserSignedIn()?.email) {
        this.admin = true;
      }
    })
  }

  async signOut() {
    const succesful = await this.auth.signOut();
    if(succesful) {
      this.router.navigate(['/login']);
    } else {
      console.log("error logging out");
    }
  }

  addItem() {
    const item = {
      "name": this.name,
      "cost": this.cost,
      "quantity": this.quantity
    };

    this.storage.addItem(item);
    this.getAllItems();
    this.clear()
  }

  clear() {
    this.name = "";
    this.cost = undefined;
    this.quantity = undefined;
  }

  deleteItem(item: any) {
    this.storage.deleteItem(item);
  }
}