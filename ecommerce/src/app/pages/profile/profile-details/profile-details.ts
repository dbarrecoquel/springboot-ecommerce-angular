import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../../stores/user.store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-details',
  imports: [CommonModule],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css',
})
export class ProfileDetails implements OnInit {


  constructor(public userStore: UserStore){

  }
  ngOnInit(): void {
    this.userStore.loadProfile();
  }
}
