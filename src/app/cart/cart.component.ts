import { LoadingService } from './../services/loading/loading.service';
import { ProductsInfoService } from './../services/products-info.service';
import { Component, inject } from '@angular/core';
import { CartCounterService } from '../services/cartCounter/cart-counter.service';
import { ProductType } from '../Types/productType';
import { DiscountPipe } from '../customPipes/discount.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [DiscountPipe, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {

  userAddedProducts : Map<number, number>
  products !: Array<ProductType>;
  private _cartCurrentValue!: number;
  total: number;
  private loadingService !: LoadingService;
  contentLoaded: boolean;

  constructor(private cartCounterService: CartCounterService, private productInfoService: ProductsInfoService){
    this.userAddedProducts = new Map<number, number>();
    this.total=0;
    this.loadingService = inject(LoadingService);
    this.contentLoaded=false;
  }

  ngOnInit(){
    
    this.loadingService.setLoader(false);

    this.loadingService.getLoaderState().subscribe(state => this.contentLoaded=state);

    this.productInfoService.getProductsList().subscribe(response => 
      {
        this.products=response.products;
        this.calcTotal();
      });
     
    this.cartCounterService.getUserProducts().subscribe(userProds => 
      {
        this.userAddedProducts=userProds;
        // this.calcTotal();
      })
    this.cartCounterService.getCounter().subscribe(counter => this._cartCurrentValue=counter);

  }

  decreaseQuantity(id : number){

    let currentProductCount = this.userAddedProducts.get(id);

    if(currentProductCount!=undefined){

      currentProductCount--;

      if(currentProductCount<1){
        this.userAddedProducts.delete(id);
      }
      else{
        this.userAddedProducts.set(id, currentProductCount);
      }
      this.cartCounterService.setCounterValue(this._cartCurrentValue-1);
      this.cartCounterService.setUserProducts(this.userAddedProducts);
    }
    this.calcTotal();
  }

  increaseQuantity(id : number){

    let currentProductCount = this.userAddedProducts.get(id);

    if(currentProductCount!=undefined){

      currentProductCount++;

      if(currentProductCount<this.products[id-1].stock){
        this.userAddedProducts.set(id, currentProductCount);
        this.cartCounterService.setUserProducts(this.userAddedProducts);
        this.cartCounterService.setCounterValue(this._cartCurrentValue+1);
      }
    }
    this.calcTotal();
  }

  delete(id: number){
    
    let currentProductCount = this.userAddedProducts.get(id);
    if(currentProductCount!=undefined){
      
      this.userAddedProducts.delete(id);
      this.cartCounterService.setCounterValue(this._cartCurrentValue-currentProductCount);
      this.cartCounterService.setUserProducts(this.userAddedProducts);
    }
    this.calcTotal();
  }

  calcTotal(){
    this.total=0;
    for(const [id, count] of this.userAddedProducts){

      this.total += (this.products[id-1].price-this.products[id-1].price*this.products[id-1].discountPercentage/100)*count;

    }
  }


}
