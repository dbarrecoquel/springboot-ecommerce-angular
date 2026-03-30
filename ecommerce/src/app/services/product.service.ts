import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product/product.model';
import { ProductResponse } from '../models/product-response/product-response.model';
import { ProductsRequest } from '../models/productrequest/product-request.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  constructor(private httpClient: HttpClient) {}
  
  /**
   * Récupérer les produits par catégorie avec pagination
   */
  getProductsByCategory(
    categoryId: number,
    subcatId: number,
    page: number = 0,
    size: number = 10
  ): Observable<ProductResponse> {
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    const url = subcatId > 0
      ? `${environment.apiUrl}/api/categories/${categoryId}/${subcatId}`
      : `${environment.apiUrl}/api/categories/${categoryId}`;
    
    return this.httpClient.get<ProductResponse>(url, { params });
  }
  
  /**
   * Récupérer un produit par SKU
   */
  getProductsBySku(categoryId: number, sku: string): Observable<Product> {
    return this.httpClient.get<Product>(
      `${environment.apiUrl}/api/categories/${categoryId}/products/${sku}`
    );
  }
  
  /**
   * Récupérer un produit par ID
   */
  getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `${environment.apiUrl}/api/products/${productId}`
    );
  }

    getProducts(req: ProductsRequest) {
        let params: any = {
          categoryId: req.categoryId,
          page: req.page,
          size: req.size
        };
      
        if (req.subCategoryId) params.subCategoryId = req.subCategoryId;
        if (req.keyword) params.keyword = req.keyword;
        if (req.minPrice != null) params.minPrice = req.minPrice;
        if (req.maxPrice != null) params.maxPrice = req.maxPrice;
      
        return this.httpClient.get<ProductResponse>(
          `${environment.apiUrl}/api/products`,
          { params }
        );
      }
  }
  