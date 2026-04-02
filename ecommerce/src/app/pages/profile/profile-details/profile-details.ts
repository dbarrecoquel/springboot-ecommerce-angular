import { Component, OnInit } from '@angular/core';
import { ProfileNavigation } from '../../../components/profile-navigation/profile-navigation';
import { UserStore } from '../../../stores/user.store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-details',
  imports: [CommonModule, ProfileNavigation],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css',
})
export class ProfileDetails implements OnInit {

  user$! : Observable<User>;

  constructor(private userStore: UserStore){

  }
  ngOnInit(): void {
    this.user$ = this.userStore.loadProfile();
  }
}
