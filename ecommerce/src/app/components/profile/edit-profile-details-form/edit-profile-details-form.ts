import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '../../../stores/user.store';
import { User } from '../../../models/user/user';

@Component({
  selector: 'app-edit-profile-details-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile-details-form.html',
  styleUrl: './edit-profile-details-form.css',
})
export class EditProfileDetailsForm implements OnInit {
  profileForm!: FormGroup;
  profile!: User;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public userStore: UserStore) {
 
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  
  }
  //field initializer pour le refresh de la page 
   _syncUserEffect = effect(() => {
    const user = this.userStore.currentUser();
    if (user && this.profileForm) {
      this.profileForm.patchValue(user);
    }
  });
  submit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.userStore.updateProfile(this.profileForm.value as User);
    this.router.navigate(['/profile']);
  }

  cancel() {
    this.router.navigate(['/profile']);
  }
}
