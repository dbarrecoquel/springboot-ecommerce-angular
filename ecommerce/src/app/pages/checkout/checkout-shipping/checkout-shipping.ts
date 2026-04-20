import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CheckoutStore } from '../../../stores/checkout.store';
import { ShippingMethod } from '../../../models/shippingmethod/shippingmethod.model';

@Component({
  selector: 'app-checkout-shipping',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout-shipping.html',
  styleUrl: './checkout-shipping.css',
})
export class CheckoutShipping implements OnInit {
  
  constructor(
    public checkoutStore: CheckoutStore,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.checkoutStore.loadShippingMethods();
  }
  
  /**
   * Sélectionner une méthode de livraison
   */
  selectMethod(method: ShippingMethod): void {
    this.checkoutStore.selectShippingMethod(method.id);
  }
  
  /**
   * Vérifier si une méthode est sélectionnée
   */
  isSelected(method: ShippingMethod): boolean {
    return this.checkoutStore.selectedShippingMethodId() === method.id;
  }
  
  /**
   * Continuer vers le paiement
   */
  continue(): void {
    const selectedId = this.checkoutStore.selectedShippingMethodId();
    
    if (!selectedId) {
      alert('Veuillez sélectionner une méthode de livraison');
      return;
    }
    
    // Sauvegarder la méthode sélectionnée
    this.checkoutStore.saveShippingMethod();
    
    // Rediriger vers l'étape suivante
    setTimeout(() => {
      this.router.navigate(['/checkout/payment']);
    }, 500);
  }
  
  /**
   * Retour aux adresses
   */
  back(): void {
    this.router.navigate(['/checkout/addresses']);
  }
}