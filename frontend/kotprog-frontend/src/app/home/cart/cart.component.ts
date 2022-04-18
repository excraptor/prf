import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Item } from 'src/app/Item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cart: CartService) { }

  ngOnInit(): void {
  }

  @Output() removedItem: EventEmitter<Item> = new EventEmitter()


  checkout() {
    
  }

  removeFromCart(item: Item) {
    //this.cart = this.cart.filter((i) => i !== item);
    const removedQuantity = this.cart.removeFromItems(item);
    //rakja vissza a berakott mennyiséget a szülőbe
    const ri: Item = {
      id: item.id,
      name: item.name,
      cost: item.cost,
      quantity: removedQuantity,
      availableQuantity: item.availableQuantity
    }
    this.removedItem.emit(item);
  }

  getItemsLength() {
    return this.cart.getItemsLength();
  }
  getItems() {
    return this.cart.items;
  }

}
