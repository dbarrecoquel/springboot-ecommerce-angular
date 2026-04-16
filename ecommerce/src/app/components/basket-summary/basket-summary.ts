import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket-summary.html',
  styleUrl: './basket-summary.css'
})
export class BasketSummary {
  
  @Input() subtotal: number = 0;
  @Input() itemCount: number = 0;
  @Output() checkout = new EventEmitter<void>();
  // Frais de livraison (à calculer selon la méthode choisie)
  get shippingCost(): number {
    return this.subtotal > 50 ? 0 : 5.99;
  }
  onCheckout() {
    this.checkout.emit();
  }
  // TVA (20%)
  get tax(): number {
    return this.subtotal * 0.2;
  }
  
  // Total
  get total(): number {
    return this.subtotal + this.shippingCost;
  }
}