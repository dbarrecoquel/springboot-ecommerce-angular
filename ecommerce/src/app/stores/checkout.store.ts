import { Injectable, signal, computed } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { Basket} from '../models/basket/basket.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutStore {
  
  private _checkoutData = signal<Basket | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  
  // Public signals
  checkoutData = this._checkoutData.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  
  // Computed
  billingAddressId = computed(() => this._checkoutData()?.billingAddressId || null);
  shippingAddressId = computed(() => this._checkoutData()?.shippingAddressId || null);
  basketId = computed(() => this._checkoutData()?.basketId || null);
  items = computed(() => this._checkoutData()?.items || []);
  itemCount = computed(() => this._checkoutData()?.itemCount || 0);
  
  constructor(private checkoutService: CheckoutService) {}
  
  /**
   * Charger les données du checkout
   */
  loadCheckoutAddresses() {
    this._loading.set(true);
    this._error.set(null);
    
    this.checkoutService.getCheckoutAddresses().subscribe({
      next: (data) => {
        this._checkoutData.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error loading checkout:', err);
        this._error.set('Impossible de charger les données du panier');
        this._loading.set(false);
      }
    });
  }
  
  /**
   * Sauvegarder les adresses sélectionnées
   */
  saveAddresses(billingAddressId: number, shippingAddressId: number) {
    this._loading.set(true);
    this._error.set(null);
    
    this.checkoutService.setCheckoutAddresses(billingAddressId, shippingAddressId).subscribe({
      next: () => {
        // Mettre à jour les IDs localement
        const current = this._checkoutData();
        if (current) {
          this._checkoutData.set({
            ...current,
            billingAddressId,
            shippingAddressId
          });
        }
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error saving addresses:', err);
        this._error.set('Impossible de sauvegarder les adresses');
        this._loading.set(false);
      }
    });
  }
}