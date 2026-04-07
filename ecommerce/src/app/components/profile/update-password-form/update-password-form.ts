import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../../stores/user.store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-password-form',
  imports: [ReactiveFormsModule, CommonModule
  ],
  templateUrl: './update-password-form.html',
  styleUrl: './update-password-form.css',
})
export class UpdatePasswordForm implements OnInit {
  passwordForm!: FormGroup;
  constructor(private fb: FormBuilder, private userStore: UserStore, private router: Router) {
  }
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  submit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.userStore.updatePassword(this.passwordForm.value);
    this.router.navigate(['/profile']);
  }
  cancel() {
    this.router.navigate(['/profile']);
  }
}
