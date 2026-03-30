import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Basket } from "../models/basket/basket.model";
import { environment } from '../environments/environment';
import { AddToBasketRequest } from "../models/basket/addtobasketrequest.model";
export interface MessageResponse {
    message : string
}
@Injectable({
    providedIn: 'root',
})

export class CartService {

    constructor(private httpClient : HttpClient){}

    public getBasket() : Observable<Basket> {

        return this.httpClient.get<Basket>(`${environment.apiUrl}/api/basket`,{withCredentials: true});

    }

    public addToBasket(addToBasketRequest : AddToBasketRequest) :Observable<MessageResponse>{
        return this.httpClient.post<MessageResponse>(`${environment.apiUrl}/api/basket/add`,addToBasketRequest, {withCredentials : true});
    }

    public deletePli(id : number) : Observable<MessageResponse> {

        return this.httpClient.delete<MessageResponse>(`${environment.apiUrl}/api/basket/remove/${id}`, {withCredentials : true})

    }

    public clearBasket() : Observable<MessageResponse> {

        return this.httpClient.delete<MessageResponse>(`${environment.apiUrl}/api/basket/clear`, {withCredentials : true})

    }

}