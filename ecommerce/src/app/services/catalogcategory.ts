import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CatalogCategory } from '../models/catalogcategory/catalogcategory.model';
import { CategoryResponse } from '../models/catalogcategory/categoryresponse.model';
@Injectable({
  providedIn: 'root',
})
export class Catalogcategory {
  constructor(private httpClient : HttpClient){}

  public getCatalogCategories() : Observable<CatalogCategory[]> {
    return this.httpClient.get<CatalogCategory[]>(`${environment.apiUrl}/api/categories`);
  }

  public getCatalogCategoryById(id : number) : Observable<CategoryResponse> {
    return this.httpClient.get<CategoryResponse>(`${environment.apiUrl}/api/categories/${id}`);
  }

}
