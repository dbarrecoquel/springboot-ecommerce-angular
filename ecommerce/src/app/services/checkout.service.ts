import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Basket} from '../models/basket/basket.model';
import { ShippingMethod } from '../models/shippingmethod/shippingmethod.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  
  constructor(private httpClient: HttpClient) {}

 
  getCheckoutAddresses(): Observable<Basket> {
    return this.httpClient.get<Basket>(
      `${environment.apiUrl}/api/checkout/addresses`
    );
  }

  /**
   * Définir les adresses de facturation et livraison
   */
  setCheckoutAddresses(billingAddressId: number, shippingAddressId: number): Observable<any> {
    return this.httpClient.post(
      `${environment.apiUrl}/api/checkout/addresses`,
      {
        billingAddressId,
        shippingAddressId
      }
    );
  }

  getShippingMethods(): Observable<ShippingMethod[]> {
    return this.httpClient.get<ShippingMethod[]>(
      `${environment.apiUrl}/api/checkout/shipping-methods`
    );
  }
  setShippingMethod(shippingMethodId: number): Observable<any> {
    return this.httpClient.post(
      `${environment.apiUrl}/api/checkout/shipping`,
      { shippingMethodId }
    );
  }
}