import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary form-related modules
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Import HttpClient for HTTP requests
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';  // Import NavComponent to update navigation state

@Component({
  selector: 'app-login-form',
  standalone: true,  // Standalone component
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],  // Import ReactiveFormsModule, CommonModule, and HttpClientModule
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private navComponent: NavComponent // Reference to NavComponent to update login status
  ) {
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

    const loginData = this.loginForm.value;

    this.http.post('https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/login', loginData)
      .subscribe(
        (response: any) => {
          console.log('Login successful!', response);
          this.navComponent.setLoginStatus(true, response.username); // Update navigation with login status and username
          this.router.navigate(['/products']); // Redirect to Products page
        },
        (error) => {
          if (error.status === 401) {
            console.error('Invalid password');
          } else if (error.status === 404) {
            console.error('Email not found');
          } else {
            console.error('Unexpected error:', error);
          }
        }
      );
  }
}
