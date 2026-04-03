import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Address } from "../models/address/address";
import { User } from "../models/user/user";

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/login`,
      {
        email,
        password
      },
      {
        observe: 'response' 
      }
    );
  }

  register(request: RegisterRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/register`,
      request,
      {
        observe: 'response'
      }
    );
  }

  saveAddress(request : Address) : Observable<any> {
    return this.http.post<any>(
        `${environment.apiUrl}/api/profile/addresses`,
        request)
  }
  getProfile() : Observable<User> {
    return this.http.get<User>(
        `${environment.apiUrl}/api/profile`)
  }
  getAddresses() : Observable<Address[]> {
    return this.http.get<Address[]>(
        `${environment.apiUrl}/api/profile/addresses`)
  }
  createAddress(address: Address) {
    return this.http.post<Address>(`${environment.apiUrl}/api/profile/addresses`, address);
  }
  
  updateAddress(address: Address) {
    return this.http.put<Address>(`${environment.apiUrl}/api/profile/addresses/${address.id}`, address);
  }
}