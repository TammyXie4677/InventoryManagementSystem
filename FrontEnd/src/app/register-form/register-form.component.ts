import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { HttpClientModule, HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-register-form',
  standalone: true,  
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],  
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = this.registerForm.value;

    this.http.post('https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/register', formData)
      .subscribe(
        response => {
          console.log('Registration successful', response);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
  }
}
