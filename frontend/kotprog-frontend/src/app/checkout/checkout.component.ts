import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Item } from '../Item';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cart: CartService,
              private router: Router,
              private storage: StorageService ) { }

  ngOnInit(): void {
  }

  items = this.cart.items;

  removeFromCart(item: Item) {
    const removedQuantity = this.cart.removeFromItems(item);
    //rakja vissza a berakott mennyiséget a szülőbe itt nem kell
  }

  buy() {
    console.log(this.getTotalCost());
    this.updateAfterBuy();
    this.router.navigate(['/home']);
  }

  getTotalCost() {
    return this.cart.totalCost();
  }

  updateAfterBuy() {
    this.storage.updateItems(this.cart.items);
    this.cart.clearCart()
  }

}
