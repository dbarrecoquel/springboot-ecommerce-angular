import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{
  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb : FormBuilder, private authService : UserService, private router : Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword : [ '',Validators.required],
      firstName : ['',Validators.required, Validators.minLength(2)],
      lastName : ['',Validators.required, Validators.minLength(2)],
      phone : ['', Validators.pattern(/^[0-9]{10}$/)]
    }, {validators : this.passwordMatchValidator }
    )
  }
  passwordMatchValidator(control : AbstractControl) : ValidationErrors | null {

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword)
      return null;

    return password.value === confirmPassword.value ? null : {passwordMismatch : true};

  }
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return passwordValid ? null : { passwordStrength: true };
  }

  get email() {return this.registerForm.get('email')}
  get password() {return this.registerForm.get('password')}
  get confirmPassword() {return this.registerForm.get('confirmPassword')}
  get firstName() {return this.registerForm.get('firstName')}
  get lastName() {return this.registerForm.get('lastName')}
  get phone() {return this.registerForm.get('phone')}

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Calculer la force du mot de passe
  getPasswordStrength(): string {
    const value = this.password?.value || '';
    
    if (value.length === 0) return '';
    if (value.length < 6) return 'weak';
    
    let strength = 0;
    if (/[a-z]/.test(value)) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^a-zA-Z0-9]/.test(value)) strength++;

    if (strength <= 2) return 'weak';
    if (strength === 3) return 'medium';
    return 'strong';
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const registerRequest = this.registerForm.value;

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.successMessage = 'Inscription réussie ! Redirection...';
        
        // Sauvegarder le token si retourné
     //   if (response.token) {
       //   localStorage.setItem('authToken', response.token);
        //}

        // Rediriger après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.loading = false;
        
        if (error.status === 400) {
          this.errorMessage = error.error || 'Données invalides. Veuillez vérifier vos informations.';
        } else if (error.status === 409) {
          this.errorMessage = 'Cet email est déjà utilisé.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    });
  }
}

