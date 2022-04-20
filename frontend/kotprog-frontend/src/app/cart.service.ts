import { Injectable } from '@angular/core';
import { Item } from './Item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  items: Item[] = []
  
  addToItems(cartItem: Item) {
    this.items.push(cartItem);
  }
  
  removeFromItems(cartItem: Item): number {
    this.items = this.items.filter((i) => i!=cartItem);
    return cartItem.quantity!;
  }

  getItemsLength() {
    return this.items.length;
  }

  totalCost() {
    let cost: number = 0;
    this.items.forEach((i) => {
      cost += (+i.cost*i.quantity!);
    });
    return cost;
  }

  clearCart() {
    this.items = [];
  }
}
