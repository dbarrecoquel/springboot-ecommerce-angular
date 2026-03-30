import { Product } from "../product/product.model";

export interface ProductResponse {
    content : Product[],
    size : number,
    totalPages : number,
    number : number,
    totalElements : number
}