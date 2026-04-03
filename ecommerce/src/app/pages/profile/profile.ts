import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserStore } from '../../stores/user.store';
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, ProfileNavigation],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  
  constructor(public userStore: UserStore) {}
  
  ngOnInit(): void {
    this.userStore.loadProfile();
  }
}