import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid token format');
        }
  
        const payload = JSON.parse(atob(parts[1])); // Decode JWT payload
        console.log('Decoded Payload:', payload);
  
        // 确保 sub 和 username 存在
        if (payload.sub && payload.sub.username) {
          this.isLoggedIn = true;
          this.username = payload.sub.username; // 从 sub 对象中获取 username
        } else {
          this.isLoggedIn = false;
          this.username = 'Guest';
        }
      } catch (error) {
        console.error('Failed to parse token:', error);
        this.isLoggedIn = false;
        this.username = '';
      }
    } else {
      console.log('No token found in localStorage');
      this.isLoggedIn = false;
      this.username = '';
    }
  }  

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

