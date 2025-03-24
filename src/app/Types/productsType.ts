import { ProductType } from "./productType";

export interface productsType{
    products : Array<ProductType>;
    total : number;
    skip : number;
    limit : number;
}