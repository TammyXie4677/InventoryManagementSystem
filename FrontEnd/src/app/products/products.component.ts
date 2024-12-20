import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isLoggedIn: boolean = false;
  products: any[] = []; 
  userId: number | null = null;; 

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient 
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.fetchProducts();
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
        this.userId = payload.sub.id; 
      } catch (error) {
        console.error('Failed to parse token:', error);
        this.isLoggedIn = false;
      }
    } else {
      console.log('No token found in localStorage');
      this.isLoggedIn = false;
    }
  }

  fetchProducts() {
    this.http
      .get<any[]>(`https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/api/products?user_id=${this.userId}`)
      .subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }
}
