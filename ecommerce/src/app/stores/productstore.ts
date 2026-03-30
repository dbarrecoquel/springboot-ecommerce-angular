import { computed, Injectable, signal } from "@angular/core";
import { ProductService } from '../services/product.service';
import { Product } from "../models/product/product.model";
import { ProductResponse } from "../models/product-response/product-response.model";

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
  
  constructor(private productService: ProductService) {}
  
  // Signals privés
  private productsResponse = signal<ProductResponse | null>(null);
  private currentProduct = signal<Product | null>(null);
  private loading = signal<boolean>(false);
  private _currentCategoryId = signal<number | null>(null);
  private _currentSubcatId = signal<number | null>(null);
  
  // Signals publics computed
  products = computed(() => this.productsResponse()?.content ?? []);
  page = computed(() => this.productsResponse()?.number ?? 0);
  totalPages = computed(() => this.productsResponse()?.totalPages ?? 0);
  totalElements = computed(() => this.productsResponse()?.totalElements ?? 0);
  product = this.currentProduct;
  isLoading = this.loading;
  
  /**
   * Charger les produits d'une catégorie avec pagination
   */
  loadProducts(categoryId: number, subcatid: number, page: number = 0, size: number = 10) {
    this.loading.set(true);
    this._currentCategoryId.set(categoryId);
    this._currentSubcatId.set(subcatid);
    
    this.productService.getProductsByCategory(categoryId, subcatid, page, size)
      .subscribe({
        next: response => {
          this.productsResponse.set(response);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.loading.set(false);
        }
      });
  }
  
  /**
   * Changer de page (garde les mêmes catégories)
   */
  changePage(page: number) {
    const categoryId = this._currentCategoryId();
    const subcatId = this._currentSubcatId();
    
    if (categoryId !== null && subcatId !== null) {
      this.loadProducts(categoryId, subcatId, page);
    }
  }
  
  /**
   * Charger un produit par SKU
   */
  loadProductBySku(categoryId: number, sku: string) {
    this.loading.set(true);
    
    this.productService.getProductsBySku(categoryId, sku)
      .subscribe({
        next: product => {
          this.currentProduct.set(product);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading product:', err);
          this.loading.set(false);
        }
      });
  }
  
  /**
   * Réinitialiser le store
   */
  clear() {
    this.productsResponse.set(null);
    this.currentProduct.set(null);
    this._currentCategoryId.set(null);
    this._currentSubcatId.set(null);
  }
}