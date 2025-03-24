import { CartCounterService } from './../services/cartCounter/cart-counter.service';
import { RouterLink } from '@angular/router';
import { ProductType } from './../Types/productType';
import { StarRatingComponent } from './../star-rating/star-rating.component';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, input, Input, InputSignal, inject, output, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, StarRatingComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {

  productToBeSent = input.required<ProductType>();
  cartNotificationEv = output<boolean>();

  private _cartCounterService: CartCounterService;

  private _cartCurrentValue!: number;
  // private _currentProductCounters !: Map<number,number>
  private _currentUserProducts!: Map<number, number>;
  cartBtnDisabled: boolean;

  constructor() {
    this._cartCounterService = inject(CartCounterService);
    this.cartBtnDisabled = false;
  }

  ngOnInit() {
    this._cartCounterService
      .getCounter()
      .subscribe((counter) => (this._cartCurrentValue = counter));

    // this._cartCounterService.getCounters().subscribe(counters => this._currentProductCounters=counters);

    this._cartCounterService
      .getUserProducts()
      .subscribe((userProducts) => (this._currentUserProducts = userProducts));
  }

  addToCart(id: number) {
    // let currentProductCounter:number|undefined = this._currentProductCounters.get(id);

    // if(currentProductCounter==undefined){
    //   currentProductCounter = this.productToBeSent().stock;
    // }

    let userProductCount: number | undefined =
      this._currentUserProducts.get(id);

    if (userProductCount == undefined) {
      userProductCount = 0;
    }

    userProductCount++;

    if (userProductCount <= this.productToBeSent().stock) {
      this._currentUserProducts.set(id, userProductCount);
      this._cartCounterService.setUserProducts(this._currentUserProducts);

      this._cartCounterService.setCounterValue(this._cartCurrentValue + 1);
      this.cartNotificationEv.emit(true);

    } else {
      alert(`You can't add more than this quantity`);
      this.cartBtnDisabled = true;
    }
  }
}
