import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogCategoryStore } from '../../stores/catalogcategory.store';
import { CatalogCategory } from '../../models/catalogcategory/catalogcategory.model';
import { BasketItemCount } from '../basket-item-count/basket-item-count';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,BasketItemCount],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  
  // Exposer le store au template
  constructor(public categoriesStore: CatalogCategoryStore) {}
  
  ngOnInit(): void {
    // Charger les catégories au démarrage
    this.categoriesStore.loadCatalogCategories();
  }
  
  // Méthode pour vérifier si une catégorie a des enfants
  hasChildren(categoryId: number): boolean {
    return this.categoriesStore.getSubCategories()(categoryId).length > 0;
  }
  
  // Méthode pour obtenir les sous-catégories
  getChildren(categoryId: number): CatalogCategory[] {
    return this.categoriesStore.getSubCategories()(categoryId);
  }
}