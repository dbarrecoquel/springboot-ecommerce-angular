import { Injectable, signal, computed } from '@angular/core';
import { Catalogcategory } from '../services/catalogcategory';
import { CatalogCategory } from '../models/catalogcategory/catalogcategory.model';
import { CategoryResponse } from '../models/catalogcategory/categoryresponse.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogCategoryStore {
  
  // Signal privé pour les catégories
  private _catalogCategories = signal<CatalogCategory[]>([]);
  
  // Signal pour la catégorie courante
  private _currentCategoryResponse = signal<CategoryResponse | null>(null);
  
  // Signal public en lecture seule
  public catalogCategories = this._catalogCategories.asReadonly();
  public currentCategoryResponse = this._currentCategoryResponse.asReadonly();
  
  // État de chargement
  public loading = signal<boolean>(false);
  public categoryLoading = signal<boolean>(false);
  
  // Erreur éventuelle
  public error = signal<string | null>(null);
  public categoryError = signal<string | null>(null);
  
  // Catégories racines (computed signal)
  public rootCategories = computed(() => 
    this._catalogCategories().filter(cat => !cat.parentCategoryId)
  );
  
  // Méthode pour obtenir les sous-catégories
  public getSubCategories = computed(() => (parentId: number) => 
    this._catalogCategories().filter(cat => cat.parentCategoryId === parentId)
  );
  
  constructor(private catalogCategoryService: Catalogcategory) {}
  
  // Charger toutes les catégories
  loadCatalogCategories() {
    this.loading.set(true);
    this.error.set(null);
    
    this.catalogCategoryService.getCatalogCategories().subscribe({
      next: (categories) => {
        this._catalogCategories.set(categories);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.error.set('Impossible de charger les catégories');
        this.loading.set(false);
      }
    });
  }
  
  // Charger une catégorie par ID avec ses produits et sous-catégories
  loadCategoryById(id: number) {
    this.categoryLoading.set(true);
    this.categoryError.set(null);
    
    this.catalogCategoryService.getCatalogCategoryById(id).subscribe({
      next: (response) => {
        this._currentCategoryResponse.set(response);
        this.categoryLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading category:', err);
        this.categoryError.set('Impossible de charger la catégorie');
        this.categoryLoading.set(false);
      }
    });
  }
  
  // Obtenir une catégorie par ID depuis le cache
  getCategoryById(id: number): CatalogCategory | undefined {
    return this._catalogCategories().find(cat => cat.id === id);
  }
  
  // Réinitialiser la catégorie courante
  clearCurrentCategory() {
    this._currentCategoryResponse.set(null);
    this.categoryError.set(null);
  }
}