import { Injectable, signal, computed } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { ShippingMethod } from '../models/shippingmethod/shippingmethod.model';
import { Basket } from '../models/basket/basket.model';


@Injectable({
  providedIn: 'root'
})
export class CheckoutStore {
  
  // Signals privés
  private _checkoutData = signal<Basket | null>(null);
  private _shippingMethods = signal<ShippingMethod[]>([]);
  private _selectedShippingMethodId = signal<number | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  
  // Signals publics
  checkoutData = this._checkoutData.asReadonly();
  shippingMethods = this._shippingMethods.asReadonly();
  selectedShippingMethodId = this._selectedShippingMethodId.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  
  // Computed
  billingAddressId = computed(() => this._checkoutData()?.billingAddressId || null);
  shippingAddressId = computed(() => this._checkoutData()?.shippingAddressId || null);
  basketId = computed(() => this._checkoutData()?.basketId || null);
  items = computed(() => this._checkoutData()?.items || []);
  itemCount = computed(() => this._checkoutData()?.itemCount || 0);
  
  selectedShippingMethod = computed(() => {
    const id = this._selectedShippingMethodId();
    if (!id) return null;
    return this._shippingMethods().find(sm => sm.id === id) || null;
  });
  
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
  
  /**
   * Charger les méthodes de livraison
   */
  loadShippingMethods() {
    this._loading.set(true);
    this._error.set(null);
    
    this.checkoutService.getShippingMethods().subscribe({
      next: (methods) => {
        this._shippingMethods.set(methods);
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error loading shipping methods:', err);
        this._error.set('Impossible de charger les méthodes de livraison');
        this._loading.set(false);
      }
    });
  }
  
  /**
   * Sélectionner une méthode de livraison
   */
  selectShippingMethod(methodId: number) {
    this._selectedShippingMethodId.set(methodId);
  }
  
  /**
   * Sauvegarder la méthode de livraison
   */
  saveShippingMethod() {
    const methodId = this._selectedShippingMethodId();
    if (!methodId) return;
    
    this._loading.set(true);
    this._error.set(null);
    
    this.checkoutService.setShippingMethod(methodId).subscribe({
      next: () => {
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error saving shipping method:', err);
        this._error.set('Impossible de sauvegarder la méthode de livraison');
        this._loading.set(false);
      }
    });
  }
}