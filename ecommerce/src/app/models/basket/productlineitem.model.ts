import { Product } from "../product/product.model";

export interface ProductLineItem {
    id : number;
    product: Product;
    quantity : number;
    unitPrice : number;
}