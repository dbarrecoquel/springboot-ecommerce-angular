import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserStore } from '../../../stores/user.store';
import { CheckoutStore } from '../../../stores/checkout.store';
import { Address } from '../../../models/address/address';
import { AddressForm } from '../../../components/address/address-form/address-form';
import { CartStore } from '../../../stores/cart.store';
import { BasketSummary } from '../../../components/basket-summary/basket-summary';

@Component({
  selector: 'app-checkout-addresses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AddressForm, BasketSummary],
  templateUrl: './checkout-addresses.html',
  styleUrl: './checkout-addresses.css',
})
export class CheckoutAddresses implements OnInit {

  selectedBillingId: number | null = null;
  selectedShippingId: number | null = null;

  selectedBillingAddress?: Address;
  selectedShippingAddress?: Address;

  showAddressForm = false;
  addressFormType: 'BILLING' | 'SHIPPING' = 'BILLING';

  private platformId = inject(PLATFORM_ID);

  constructor(
    public userStore: UserStore,
    public checkoutStore: CheckoutStore,
    private router: Router,
    public cartStore: CartStore
  ) {}

  ngOnInit(): void {

    if (!this.userStore.isLoggedIn()) return;

    if (isPlatformBrowser(this.platformId)) {
      this.cartStore.loadBasket();
    }

    this.userStore.loadAddresses();
    this.checkoutStore.loadCheckoutAddresses();
  }

  // ✅ getters
  get billingAddresses(): Address[] {
    return this.userStore.addressesList().filter(a => a.addressType === 'BILLING');
  }

  get shippingAddresses(): Address[] {
    return this.userStore.addressesList().filter(a => a.addressType === 'SHIPPING');
  }

  getAddressById(id: number | null): Address | undefined {
    if (!id) return undefined;
    return this.userStore.addressesList().find(a => a.id === id);
  }

  // ✅ sélection billing
  onBillingChange(id: number) {
    this.selectedBillingId = +id;
    this.selectedBillingAddress = this.getAddressById(this.selectedBillingId);
  }

  // ✅ sélection shipping
  onShippingChange(id: number) {
    this.selectedShippingId = +id;
    this.selectedShippingAddress = this.getAddressById(this.selectedShippingId);
  }

  openAddressForm(type: 'BILLING' | 'SHIPPING') {
    this.addressFormType = type;
    this.showAddressForm = true;
  }

  closeAddressForm() {
    this.showAddressForm = false;
  }

  continue() {
    if (!this.selectedBillingId || !this.selectedShippingId) {
      alert('Veuillez sélectionner les adresses');
      return;
    }

    this.checkoutStore.saveAddresses(
      this.selectedBillingId,
      this.selectedShippingId
    );

    this.router.navigate(['/checkout/shipping']);
  }

  backToBasket() {
    this.router.navigate(['/basket']);
  }
}