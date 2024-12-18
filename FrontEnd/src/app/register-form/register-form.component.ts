import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary form-related modules
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf

@Component({
  selector: 'app-register-form',
  standalone: true,  // This makes it a standalone component
  imports: [ReactiveFormsModule, CommonModule],  // Import both ReactiveFormsModule and CommonModule
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Using FormBuilder to create the form and add validation
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Custom validator to compare password and confirm password
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  // Getter to simplify access to form controls
  get f() {
    return this.registerForm.controls;
  }

  // Handle form submission
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log('Form Submitted!', this.registerForm.value);
  }
}