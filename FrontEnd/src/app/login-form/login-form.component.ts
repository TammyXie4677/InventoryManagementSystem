import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  loading: boolean = false; // Indicates loading state
  errorMessage: string = ''; // Stores error messages

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true; // Show loading spinner
    this.errorMessage = ''; // Clear previous errors

    const loginData = this.loginForm.value;

    this.http.post('https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/login', loginData)
      .subscribe(
        (response: any) => {
          this.loading = false; // Hide loading spinner
          console.log('Login successful!', response);

          // Store JWT in localStorage
          localStorage.setItem('token', response.access_token);

          // Redirect to another page 
          window.location.href = '/products'; 
        },
        (error) => {
          this.loading = false; // Hide loading spinner
          if (error.status === 401) {
            this.errorMessage = 'Invalid password.';
          } else if (error.status === 404) {
            this.errorMessage = 'Email not found.';
          } else {
            this.errorMessage = 'Unexpected error. Please try again later.';
          }
        }
      );
  }
}

