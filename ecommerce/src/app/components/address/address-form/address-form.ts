import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../../stores/user.store';


@Component({
  selector: 'app-address-form',
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css',
})
export class AddressForm implements OnInit{
  addressForm! : FormGroup;

  constructor(public userStore : UserStore, private fb : FormBuilder){}
  
  ngOnInit(): void {
    this.addressForm = this.fb.group({

      label :  ['', [Validators.required]],
      addressType :  ['', [Validators.required]],
      street : ['', [Validators.required]],
      complement : [''],
      postalCode : [ '',Validators.required],
      citry : ['',Validators.required, Validators.minLength(2)],
      country : ['',Validators.required, Validators.minLength(2)],
    }
    )
  }

  submit() {

  }
}
