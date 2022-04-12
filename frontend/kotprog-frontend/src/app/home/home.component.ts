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
  }

  items: DocumentData[] = []

  async getAllItems() {
    this.items = [];
    const allItems = await this.storage.getAllItems();
    allItems.forEach((doc) => this.items.push(doc.data()))
  }
  getUserSignedIn() {
    return this.auth.getUserSignedIn();
  }

  async signOut() {
    const succesful = await this.auth.signOut();
    if(succesful) {
      this.router.navigate(['/login']);
    } else {
      console.log("error logging out");
    }
  }

}
