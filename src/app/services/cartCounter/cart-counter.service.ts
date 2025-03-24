import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartCounterService {

  private cartCounter : BehaviorSubject<number>;

  private productsCounters : BehaviorSubject<Map<number, number>>;

  private userProducts : BehaviorSubject<Map<number, number>>;

  constructor() { 
    this.cartCounter = new BehaviorSubject<number>(0);
    this.productsCounters = new BehaviorSubject<Map<number, number>>(new Map<number,number>());
    this.userProducts = new BehaviorSubject(new Map<number,number>());
  }

  getCounter(){
    return this.cartCounter.asObservable();
  }

  setCounterValue(value : number){
    this.cartCounter.next(value);
  }

  getCounters(){
    return this.productsCounters.asObservable();
  }

  setCounters(counters : Map<number, number>){
    
    this.productsCounters.next(counters);
  }

  setUserProducts(value : Map<number, number>){

    this.userProducts.next(value);
  }

  getUserProducts(){

    return this.userProducts.asObservable();
  }

}
