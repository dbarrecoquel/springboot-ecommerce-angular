import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CatalogCategoryStore } from '../../stores/catalogcategory.store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  
  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    public categoriesStore: CatalogCategoryStore
  ) {}
  
  ngOnInit(): void {
    // Charger les catégories si nécessaire
    if (this.categoriesStore.catalogCategories().length === 0) {
      this.categoriesStore.loadCatalogCategories();
    }

    // Écouter les changements de paramètre d'URL
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const categoryId = +params['id'];
      if (categoryId) {
        this.categoriesStore.loadCategoryById(categoryId);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.categoriesStore.clearCurrentCategory();
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}