import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // 导入 ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // 导入表单相关模块
import { CommonModule } from '@angular/common';  // 导入 CommonModule 用于 *ngIf
import { HttpClientModule, HttpClient } from '@angular/common/http';  // 导入 HttpClient 和 HttpClientModule

@Component({
  selector: 'app-register-form',
  standalone: true,  // 使其成为独立组件
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],  // 导入 ReactiveFormsModule, CommonModule 和 HttpClientModule
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // 使用 FormBuilder 创建表单并添加验证
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

  // 自定义验证器，比较密码和确认密码
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  // 简化访问表单控件
  get f() {
    return this.registerForm.controls;
  }

  // 处理表单提交
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    // 获取表单数据
    const formData = this.registerForm.value;

    // 发送 POST 请求到 Heroku 后端
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
