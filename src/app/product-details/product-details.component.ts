import { LoadingService } from './../services/loading/loading.service';
import { RouterLink } from '@angular/router';
import { DiscountPipe } from './../customPipes/discount.pipe';
import { ProductType } from './../Types/productType';
import { Component, Input, numberAttribute, inject } from '@angular/core';
import * as products from "../fileAssests/products.json";
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ProductsInfoService } from '../services/products-info.service';
import { CartCounterService } from '../services/cartCounter/cart-counter.service';

@Component({
  selector: 'app-product-details',
  imports: [StarRatingComponent, CurrencyPipe, DecimalPipe, DiscountPipe, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  @Input() Id !: string;

  currentProduct !: ProductType;

  responseLoaded : boolean;

  private _cartCounterService: CartCounterService;

  private _cartCurrentValue!: number;
  private _currentUserProducts!: Map<number, number>;
  currentProductCounter : number;

  constructor(private productService : ProductsInfoService, private loadingService: LoadingService){

    // this.currentProduct = products["products"][0];

    this.responseLoaded = false;
    this._cartCounterService = inject(CartCounterService);
    this.currentProductCounter = 1;
  }

  ngOnInit(){

    // let tempProduct = products["products"].find(product => product.id==Number(this.Id) );

    this.loadingService.setLoader(false);
    this.productService.getProductDetails(this.Id).subscribe(response => this.currentProduct = response);

    this._cartCounterService.getCounter().subscribe(counter => this._cartCurrentValue=counter);
    this._cartCounterService.getUserProducts().subscribe(userProducts => 
      {
        this._currentUserProducts = userProducts;
      });

    this.loadingService.getLoaderState().subscribe(state => this.responseLoaded = state);
    
    // if(tempProduct!=undefined){

    //   this.currentProduct = tempProduct;
    // }
  }

  decreaseQuantity(){

    if(this.currentProductCounter<2){
      this.currentProductCounter=1;
    }
    else{
      this.currentProductCounter--;
    }
  }

  increaseQuantity(){

    let userProductCount = this._currentUserProducts.get(Number(this.Id));

    if(userProductCount==undefined)
      userProductCount=0;

    if((this.currentProductCounter+userProductCount)>=this.currentProduct.stock){
      this.currentProductCounter=this.currentProduct.stock;
    }
    else{
      this.currentProductCounter++;
    }
  }

  addToCart(){

    let userProductCount = this._currentUserProducts.get(Number(this.Id));

    if(userProductCount==undefined)
      userProductCount=0;

    this._currentUserProducts.set(Number(this.Id),userProductCount+this.currentProductCounter);
    this._cartCounterService.setUserProducts(this._currentUserProducts);
    this._cartCounterService.setCounterValue(this._cartCurrentValue + this.currentProductCounter);
  }

}
