import { ProductType } from './../Types/productType';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: ProductType, ...args: number[]): number {

    let returnValue : number = 0;

    if(args.length==0){

      returnValue = value.price-value.discountPercentage*value.price/100;
    }
    else if(args.length==1){

      returnValue =  (value.price-value.discountPercentage*value.price/100)/args[0];
    }
    else if(args.length==2){
      // To get the multiplication of the price of all instances of the same product
      returnValue = (value.price-value.discountPercentage*value.price/100)*args[1];
    }

    return returnValue;
  }

}
