import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  isLoggedIn: boolean = false;
  products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 300 },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    } else {
      this.isLoggedIn = false;
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

        // If the token is valid, set the user as logged in
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Failed to parse token:', error);
        this.isLoggedIn = false;
      }
    } else {
      console.log('No token found in localStorage');
      this.isLoggedIn = false;
    }
  }
}
