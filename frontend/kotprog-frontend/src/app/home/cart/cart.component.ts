import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/Item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() cart: Item[] = []

  checkout() {
    
  }

  removeFromCart(item: Item) {
    this.cart = this.cart.filter((i) => i !== item);
    //rakja vissza a berakott mennyiséget a szülőbe
  }

}
