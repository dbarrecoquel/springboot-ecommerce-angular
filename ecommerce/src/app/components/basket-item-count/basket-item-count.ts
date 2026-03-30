import { Component, OnInit } from '@angular/core';
import { CartStore } from '../../stores/cart.store';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-basket-item-count',
  imports: [],
  templateUrl: './basket-item-count.html',
  styleUrl: './basket-item-count.css',
})
export class BasketItemCount implements OnInit{
  private platformId = inject(PLATFORM_ID);
  constructor(public cartStore : CartStore){}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
      this.cartStore.loadBasket();
  }
}
