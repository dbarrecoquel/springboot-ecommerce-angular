import { ProductLineItem } from "./productlineitem.model";

export interface Basket {

    basketId: number;
    items: ProductLineItem[];
    itemCount: number;
    billingAddressId: number | null;
    shippingAddressId: number | null;
    total?: number;

}