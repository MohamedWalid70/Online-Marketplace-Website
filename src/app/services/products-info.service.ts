import { productsType } from './../Types/productsType';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductType } from '../Types/productType';

@Injectable({
  providedIn: 'root'
})

export class ProductsInfoService {

  // This can be configgured to display the desired products number per page
  private pageProductsNo: number;

  constructor(private http : HttpClient) { 
    this.pageProductsNo = 8;
  }

  getProductsList(): Observable<productsType> {
    return this.http.get<productsType>(`${environment.baseUrl}/products`,
      {
        params: {
          limit: 64
        }
      }
    );
  }

  getProductDetails(Id : string) : Observable<ProductType> {
    return this.http.get<ProductType>(`${environment.baseUrl}/products/${Id}`);
  }

  getProductsPage(pageNumber : number): Observable<productsType>{

    return this.http.get<productsType>(`${environment.baseUrl}/products`, {

      params: {

        limit : this.pageProductsNo,
        skip: this.pageProductsNo*pageNumber
      }
    })
  }
}
