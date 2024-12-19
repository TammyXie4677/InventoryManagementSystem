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
        const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        this.isLoggedIn = true;
        this.username = user.username;
        this.cdr.detectChanges(); 
      } catch (error) {
        console.error('Failed to parse token:', error);
        this.isLoggedIn = false;
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

