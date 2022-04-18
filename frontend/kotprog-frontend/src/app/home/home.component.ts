import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Item } from '../Item';
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storage: StorageService, 
              private auth: LoginService, 
              private router: Router,
              private cart: CartService) { }

  ngOnInit(): void {
    this.getAllItems();
    this.setAdmin()
  }

  items: Item[] = []
  admin = false;
  name = "";
  cost: number | undefined;
  quantity: number | undefined;
  isShowCart = false;
  defaultErrorMessage = "Something went wrong";
  errorMessage = this.defaultErrorMessage;
  



  async getAllItems() {
    this.items = await this.storage.getAllItems();
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
    this.clear();
  }

  clear() {
    this.name = "";
    this.cost = undefined;
    this.quantity = undefined;
  }

  deleteItem(id: string) {
    this.storage.deleteItem(id);
    this.getAllItems();
  }

  addToCart(item: Item, quantity: number | undefined) {
    if(quantity !== undefined) {
      if(item.availableQuantity >= quantity) {
        item.availableQuantity -= quantity;
      } else {
        this.errorMessage = `There are only ${item.quantity} items!`;
        return;
      }
      const cartItem: Item = {...item};
      cartItem.quantity = quantity;
      this.cart.addToItems(cartItem);
    }
    
  }

  showCart() {
    this.isShowCart = !this.isShowCart;
  }

  removedItemFromCart(item: Item) {
    this.items.map((i) => {
      if(i.id === item.id) {
        i.availableQuantity += +item.quantity!;
      }
    })
  }

  getItemsInCartLength() {
    return this.cart.getItemsLength();
  }
}