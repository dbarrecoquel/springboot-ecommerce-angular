import { computed, Injectable, signal } from "@angular/core";
import { Basket } from "../models/basket/basket.model";
import { CartService } from "../services/cart.service";

@Injectable({
    providedIn: 'root'
  })
  export class CartStore {

    private _basket = signal<Basket | null>(null);
    public basket = this._basket.asReadonly();
    public loading = signal<boolean>(false);
    public error = signal<boolean>(false);
    private initialized = signal(false);
    public productLineItems  = computed(() => this.basket()?.items ?? []);
    public total = computed(() => this.basket()?.total || 0);
    public itemCount = computed(()=> this.basket()?.itemCount || 0);
    isLoading = this.loading;
    isInitialized = this.initialized;
    constructor(private basketService : CartService) {}

    loadBasket() {
        this.loading.set(true);

        this.basketService.getBasket().subscribe({
            next: response => {
              this._basket.set(response);
              this.loading.set(false);
              this.isInitialized.set(true);
            },
            error: (err) => {
              console.error('Error loading products:', err);
              this.loading.set(false);
              this.initialized.set(true);
            }
          });
    }

    addToBasket(request: { productId: number; quantity: number }) {
        this.loading.set(true);
      
        this.basketService.addToBasket(request).subscribe({
          next: () => {
            this.loadBasket();
          },
          error: (err) => {
            console.error('Error adding to basket:', err);
            this.loading.set(false);
          }
        });
      }

      deletePli(id : number) {
        this.loading.set(true);

        this.basketService.deletePli(id).subscribe({
            next : () => {
                this.loadBasket();
            },
            error : (err) => {
                console.error('Error deleting item');
                this.loading.set(false);
            }
        })

      }
      clearBasket() {
        this.loading.set(true);

        this.basketService.clearBasket().subscribe({
            next : () => {
                this.loadBasket();
            },
            error : (err) => {
                console.error('Error deleting item');
                this.loading.set(false);
            }
        })
      }

      updateQuantity(id:number, quantity: number){
        const request = {
            quantity
        }
        this.basketService.updateQuantity(id,request).subscribe({
            next : () => {
                this.loadBasket();
            },
            error : (err) => {
                console.error('Error deleting item');
                this.loading.set(false);
            }
        })
      
      }
  }