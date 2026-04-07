import { Component, OnInit } from '@angular/core';
import { EditProfileDetailsForm } from '../../../components/profile/edit-profile-details-form/edit-profile-details-form';
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'app-edit-profile-details',
  imports: [EditProfileDetailsForm],
  templateUrl: './edit-profile-details.html',
  styleUrl: './edit-profile-details.css',
})
export class EditProfileDetails implements OnInit{

    constructor(private userStore: UserStore) {
    }
    ngOnInit(): void {
        this.userStore.loadProfile();
    }
}
