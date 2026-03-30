import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductItem } from '../../components/product-item/product-item';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStore } from '../../stores/productstore';
import { CommonModule } from '@angular/common';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItem, Pagination],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit, OnDestroy {
  
  categoryId!: number;
  subcatId!: number;
  private destroy$ = new Subject<void>();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public store: ProductStore
  ) {}
  
  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.route.queryParams
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([params, query]) => {
      this.categoryId = +params['id'];
      this.subcatId = +params['subcatid'] || 0;
  
      const page = +query['page'] || 0;
  
      this.store.loadProducts(this.categoryId, this.subcatId, page);
    });
  }
  
  /**
   * Gestion du changement de page
   */
  onPageChange(page: number): void {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.clear();
  }
}