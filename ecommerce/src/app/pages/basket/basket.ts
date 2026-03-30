import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartStore } from '../../stores/cart.store';
import { BasketSummary } from '../../components/basket-summary/basket-summary';
import { ProductLineItem } from '../../models/basket/productlineitem.model';


@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterModule, BasketSummary],
  templateUrl: './basket.html',
  styleUrl: './basket.css'
})
export class Basket implements OnInit {
  
  private platformId = inject(PLATFORM_ID);
  constructor(public cartStore: CartStore) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
    this.cartStore.loadBasket();
  }
  
  updateQuantity(item: ProductLineItem, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(item);
      return;
    }
    
    console.log('Update quantity:', item, newQuantity);
  }
  
  removeItem(item: ProductLineItem): void {
    if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.cartStore.deletePli(item.id);
    }
  }
  
  clearBasket(): void {
    if (confirm('Voulez-vous vraiment vider le panier ?')) {
        this.cartStore.clearBasket();
    }
  }
  
  getItemTotal(item: ProductLineItem): number {
    return item.quantity * item.unitPrice;
  }
}