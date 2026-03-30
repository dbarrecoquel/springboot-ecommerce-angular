import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product/product.model';
import { ProductResponse } from '../models/product-response/product-response.model';
import { ProductsRequest } from '../models/productrequest/product-request.model';

@Injectable({
  providedIn: 'root'
})
export class SearchStore {

  constructor(private productService: ProductService) {

    toObservable(this.request)
      .pipe(
        debounceTime(200),
        tap(() => this.loading.set(true)),
        switchMap(req => this.productService.getProducts(req))
      )
      .subscribe({
        next: res => {
          this.productsResponse.set(res);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  // STATE
  private productsResponse = signal<ProductResponse | null>(null);
  private currentProduct = signal<Product | null>(null);

  private loading = signal(false);

  request = signal<ProductsRequest>({
    categoryId: 0,
    page: 0,
    size: 12,
    subCategoryId: 0,
    keyword: '',
    minPrice: undefined,
    maxPrice: undefined
  });
  setKeyword(keyword: string) {
    this.updateRequest({ keyword, page: 0 });
  }
  
  setPriceRange(minPrice?: number, maxPrice?: number) {
    this.updateRequest({ minPrice, maxPrice, page: 0 });
  }
  // SELECTORS
  products = computed(() => this.productsResponse()?.content ?? []);

  page = computed(() => this.productsResponse()?.number ?? 0);

  totalPages = computed(() => this.productsResponse()?.totalPages ?? 0);

  totalElements = computed(() => this.productsResponse()?.totalElements ?? 0);

  product = this.currentProduct;

  isLoading = this.loading;

  // ACTIONS

  updateRequest(patch: Partial<ProductsRequest>) {
    this.request.set({
      ...this.request(),
      ...patch
    });
  }

  loadProducts(categoryId: number, subCategoryId?: number) {
    this.updateRequest({
      categoryId,
      subCategoryId,
      page: 0 // reset page
    });
  }


}