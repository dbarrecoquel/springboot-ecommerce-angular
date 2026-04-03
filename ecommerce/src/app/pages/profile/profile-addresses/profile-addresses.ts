import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../../stores/user.store';
import { Router } from '@angular/router';
import { Address } from '../../../models/address/address';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-addresses',
  templateUrl: './profile-addresses.html',
  styleUrl: './profile-addresses.css',
  imports: [CommonModule]
})
export class ProfileAddresses implements OnInit {

  constructor(
    public userStore: UserStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userStore.loadAddresses();
  }

  add() {
    this.router.navigate(['/profile/addresses/new']);
  }

  edit(address: Address) {
    this.router.navigate(['/profile/addresses/edit', address.id]);
  }
}