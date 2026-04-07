import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../../stores/user.store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  imports: [CommonModule],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css',
})
export class ProfileDetails implements OnInit {


  constructor(public userStore: UserStore, private router: Router){

  }
  ngOnInit(): void {
    this.userStore.loadProfile();
  }
  editProfileDetails() {
    this.router.navigate(['/profile/profile-details/edit']);
  }
}
