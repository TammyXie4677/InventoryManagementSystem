import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary form-related modules
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf

@Component({
  selector: 'app-login-form',
  standalone: true,  // Standalone component
  imports: [ReactiveFormsModule, CommonModule],  // Import both ReactiveFormsModule and CommonModule
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log('Form Submitted!', this.loginForm.value);
  }
}


