import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'app-address-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
   
  ],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css',
})
export class AddressForm implements OnInit {
  
  addressForm!: FormGroup;
  isEdit = false;
  addressId: number | null = null;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public userStore: UserStore
  ) {}
  
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      id: [null],
      label: ['', Validators.required],
      addressType: ['', Validators.required],
      street: ['', Validators.required],
      complement: [''],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['France', Validators.required],
    });

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
  
  submit() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    const value = this.addressForm.value;

    if (this.isEdit) {
      this.userStore.updateAddress(value);
    } else {
      this.userStore.createAddress(value);
    }

    this.router.navigate(['/profile/addresses']);
  }
  
  cancel() {
    this.router.navigate(['/profile/addresses']);
  }
}