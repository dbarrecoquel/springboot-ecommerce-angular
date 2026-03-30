import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductStore } from '../../stores/productstore';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CartStore } from '../../stores/cart.store';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
})
export class ProductDetails implements OnInit, OnDestroy {

    destroy$ = new Subject();
    quantity: number = 1;


    constructor(private route : ActivatedRoute ,public store : ProductStore, private cartStore : CartStore){}

    ngOnInit(): void {
      this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {

        const categoryId = +params['id'];
        const sku = params['sku'];
        this.store.loadProductBySku(categoryId,sku);
      })
  
    }

    ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
    addToCart(product: any) {
      const addToBasketRequest = {
        productId: product.id,
        quantity: this.quantity
      };
    
      this.cartStore.addToBasket(addToBasketRequest); // ✅
    }
}
