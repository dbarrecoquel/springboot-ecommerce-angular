import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../stores/user.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {

  error = signal<string | null>(null);
  private fb = inject(FormBuilder);
  userStore = inject(UserStore);

 
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.userStore.login(email!, password!)
      .subscribe({
        error: () => this.error.set('Invalid credentials')
      });
  }
}