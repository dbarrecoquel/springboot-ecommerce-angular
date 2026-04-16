import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css',
})
export class AddressForm implements OnInit {
  
  // Inputs pour le mode modal
  @Input() addressType?: 'BILLING' | 'SHIPPING';  // Type pré-sélectionné
  @Input() isModal: boolean = false;  // Mode modal ou page complète
  
  // Outputs pour le mode modal
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  
  addressForm!: FormGroup;
  isEdit = false;
  addressId: number | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public userStore: UserStore
  ) {}
  
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      id: [null],
      label: ['', [Validators.required, Validators.minLength(2)]],
      addressType: [this.addressType || '', Validators.required],
      street: ['', [Validators.required, Validators.minLength(5)]],
      complement: [''],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      country: ['France', Validators.required],
    });
    
    // Si addressType est fourni en Input, désactiver le champ
    if (this.addressType) {
      this.addressForm.get('addressType')?.disable();
    }
    
    // Détecter le mode édition (uniquement si pas en mode modal)
    if (!this.isModal) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.isEdit = true;
        this.addressId = +id;
        
        const address = this.userStore.addressesList()
          .find(a => a.id === this.addressId);
        
        if (address) {
          this.addressForm.patchValue(address);
        }
      }
    }
  }
  
  // Getters pour faciliter l'accès aux contrôles
  get label() { return this.addressForm.get('label'); }
  get addressTypeControl() { return this.addressForm.get('addressType'); }
  get street() { return this.addressForm.get('street'); }
  get complement() { return this.addressForm.get('complement'); }
  get postalCode() { return this.addressForm.get('postalCode'); }
  get city() { return this.addressForm.get('city'); }
  get country() { return this.addressForm.get('country'); }
  
  submit() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    // Récupérer les valeurs (y compris les champs désactivés)
    const value = {
      ...this.addressForm.value,
      addressType: this.addressType || this.addressForm.value.addressType
    };
    
    if (this.isEdit) {
      this.userStore.updateAddress(value);
      this.successMessage = 'Adresse mise à jour avec succès !';
    } else {
      this.userStore.createAddress(value);
      this.successMessage = 'Adresse créée avec succès !';
    }
    
    this.loading = false;
    
    // Si mode modal, émettre l'événement et fermer
    if (this.isModal) {
      setTimeout(() => {
        this.onSave.emit();
      }, 500);
    } else {
      // Si mode page, rediriger après 2 secondes
      setTimeout(() => {
        this.router.navigate(['/profile/addresses']);
      }, 2000);
    }
  }
  
  cancel() {
    if (this.isModal) {
      this.onCancel.emit();
    } else {
      this.router.navigate(['/profile/addresses']);
    }
  }
}