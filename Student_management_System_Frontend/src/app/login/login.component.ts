import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  // 1. Updated 'email' to 'username' to match your API body
  loginForm = this.fb.group({
    username: ['', [Validators.required]], // Removed Validators.email
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = '';

  onLogin() {
    if (this.loginForm.valid) {
      // 2. this.loginForm.value will now correctly send:
      // { "username": "...", "password": "..." }
// Update this line
    this.http.post('https://localhost:7050/api/auth/login', this.loginForm.value)
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            // 3. Updated error message to be more generic
            this.errorMessage = 'Invalid username or password. Please try again.';
          }
        });
    }
  }
}