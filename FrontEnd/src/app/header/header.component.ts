import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    } else {
      this.isLoggedIn = false;
      this.username = '';
    }
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

        if (payload.sub && payload.sub.username) {
          this.isLoggedIn = true;
          this.username = payload.sub.username;
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
