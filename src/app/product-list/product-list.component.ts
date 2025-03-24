import { LoadingService } from './../services/loading/loading.service';
import { ProductsInfoService } from './../services/products-info.service';
import { ProductType } from './../Types/productType';
import { ProductCardComponent } from './../product-card/product-card.component';
import { Component } from '@angular/core';
import * as products from '../fileAssests/products.json';
import { Subscription } from 'rxjs';
import { Toast } from 'bootstrap';


@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  importedProducts!: Array<ProductType>;

  responseLoaded: boolean;

  pageIndex: number;

  private pageSubscription!: Subscription;

  private pagesLimit: number;

  // This is the one that is shown in the page
  productsList!: Array<ProductType>;

  constructor(
    private productService: ProductsInfoService,
    private loadingService: LoadingService
  ) {
    this.productsList = new Array<ProductType>(0);
    this.responseLoaded = false;
    this.pageIndex = 0;
    this.pagesLimit=7;
    // denotes 8 products per page
  }

  ngOnInit() {

    // this.productService.getProductsList().subscribe((response) => {
    //   this.pagesLimit = response.limit / 6;
    // });

    this.loadingService.setLoader(false);

    this.pageSubscription = this.productService
      .getProductsPage(this.pageIndex)
      .subscribe((response) => {
        this.importedProducts = response.products;
        this.productsList = this.importedProducts;
      });

    this.loadingService
      .getLoaderState()
      .subscribe((state) => (this.responseLoaded = state));
  }

  productToBeSent!: ProductType;

  searchProduct(productText: string) {
    this.productsList = this.importedProducts.filter((prod) =>
      prod.title.toLowerCase().startsWith(productText.toLowerCase())
    );
  }

  cancelsearch() {
    this.productsList = this.importedProducts;
  }

  notifyUser(value : boolean){
    if(value==true){

      const toastLiveExample = document.getElementById('liveToast') as Element;
      const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    }

  }

  updatePage(pageArg: number) {
    this.pageSubscription.unsubscribe();

    if (pageArg > -1 && pageArg < 3) {
      this.pageIndex = pageArg;
      this.pageSubscription = this.productService
        .getProductsPage(this.pageIndex)
        .subscribe((response) => {
          this.importedProducts = response.products;
          this.productsList = this.importedProducts;
        });
    } else if (pageArg == -1) {
      if (this.pageIndex > 0) {
        this.pageIndex--;

        this.pageSubscription = this.productService
          .getProductsPage(this.pageIndex)
          .subscribe((response) => {
            this.importedProducts = response.products;
            this.productsList = this.importedProducts;
          });
      }
    } else if (pageArg == 3) {
      if (this.pageIndex < this.pagesLimit) {
        this.pageIndex++;

        this.pageSubscription = this.productService
          .getProductsPage(this.pageIndex)
          .subscribe((response) => {
            this.importedProducts = response.products;
            this.productsList = this.importedProducts;
          });
      }
    }
  }
}
