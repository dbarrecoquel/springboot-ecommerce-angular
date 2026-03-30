import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogCategoryStore } from '../../stores/catalogcategory.store';
import { NavbarComponent } from '../../components/navbar/navbar';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.html',
  styleUrls : ['./home.css'],
})
export class Home implements OnInit {
  constructor(public categoriesStore: CatalogCategoryStore) {}

  ngOnInit(): void {
    // Charger les catégories si pas déjà chargées
    if (this.categoriesStore.catalogCategories().length === 0) {
      this.categoriesStore.loadCatalogCategories();
    }
  }
}