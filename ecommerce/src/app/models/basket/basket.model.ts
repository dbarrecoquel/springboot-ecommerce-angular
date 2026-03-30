import { ProductLineItem } from "./productlineitem.model";

export interface Basket {

    basketId : number;
    items : ProductLineItem[];
    total : number;
    itemCount : number;

}