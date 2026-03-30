import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  changeDetection: ChangeDetectionStrategy.Default  // ← Important
})
export class Pagination {
  
  @Input() page: number = 0;
  @Input() totalPages: number = 0;
  
  @Output() pageChange = new EventEmitter<number>();
  
  // Calculer les pages visibles
  get visiblePages(): number[] {
    const maxVisible = 5;
    
    if (this.totalPages <= maxVisible) {
      return Array.from({ length: this.totalPages }, (_, i) => i);
    }
    
    let start = Math.max(0, this.page - 2);
    let end = Math.min(this.totalPages, start + maxVisible);
    
    if (end - start < maxVisible) {
      start = Math.max(0, end - maxVisible);
    }
    
    return Array.from({ length: end - start }, (_, i) => start + i);
  }
  
  isActivePage(p: number): boolean {
    const isActive = p === this.page;
    console.log(`Page ${p} is active:`, isActive, '(current page:', this.page, ')');
    return isActive;
  }
  
  // TrackBy function pour optimiser le ngFor
  trackByPage(index: number, page: number): number {
    return page;
  }
  
  prev() {
    if (this.page > 0) {
      this.pageChange.emit(this.page - 1);
    }
  }
  
  next() {
    if (this.page < this.totalPages - 1) {
      this.pageChange.emit(this.page + 1);
    }
  }
  
  goTo(page: number) {
    if (page >= 0 && page < this.totalPages) {
      console.log('🎯 Going to page:', page);
      this.pageChange.emit(page);
    }
  }
  
  first() {
    if (this.page !== 0) {
      this.pageChange.emit(0);
    }
  }
  
  last() {
    const lastPage = this.totalPages - 1;
    if (this.page !== lastPage) {
      this.pageChange.emit(lastPage);
    }
  }
  
  displayPage(page: number): number {
    return page + 1;
  }
  
  isFirstPage(): boolean {
    return this.page === 0;
  }
  
  isLastPage(): boolean {
    return this.page === this.totalPages - 1;
  }
}