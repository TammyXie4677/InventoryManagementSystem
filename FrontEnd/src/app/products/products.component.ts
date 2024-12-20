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
  email: string = '';
  products: any[] = [];
  currentProduct: any = { name: '', description: '', price: 0, quantity: 0 }; 
  isEditing: boolean = false; 
  loading: boolean = false;
  errorMessage: string = '';

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

        this.isLoggedIn = true;
        this.email = payload.sub.email || ''; 
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
    if (!this.email) {
      this.errorMessage = 'Cannot fetch products: email is not available';
      console.error(this.errorMessage);
      return;
    }

    this.loading = true; 
    this.http
      .get<any[]>(`https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/api/products?email=${this.email}`)
      .subscribe(
        (data) => {
          this.products = data;
          this.loading = false; 
        },
        (error) => {
          console.error('Error fetching products:', error);
          this.errorMessage = 'Failed to fetch products. Please try again later.';
          this.loading = false; 
        }
      );
  }

  createProduct(productData: { name: string; description: string; price: number; quantity: number }) {
    if (!this.email) {
      console.error('Cannot create product: email is not available');
      return;
    }
  
    const payload = {
      ...productData,
      email: this.email, 
    };
  
    this.loading = true; 
    this.http
      .post<any>('https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/api/products', payload)
      .subscribe(
        (data) => {
          console.log('Product created:', data);
          this.products.push(data.product); 
          this.loading = false;
        },
        (error) => {
          console.error('Error creating product:', error);
          this.errorMessage = 'Failed to create product. Please check your input.';
          this.loading = false; 
        }
      );
  }  

  deleteProduct(productId: number): void {
    if (!productId) {
      console.error('Invalid product ID');
      return;
    }
  
    if (!confirm('Are you sure you want to delete this product?')) {
      return; 
    }
  
    this.loading = true; 
    this.http
      .delete(`https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/api/products/${productId}`)
      .subscribe(
        () => {
          console.log(`Product with ID ${productId} deleted successfully.`);
          this.products = this.products.filter((product) => product.id !== productId); 
          this.loading = false; 
        },
        (error) => {
          console.error('Error deleting product:', error);
          this.errorMessage = 'Failed to delete product. Please try again later.';
          this.loading = false; 
        }
      );
  }  

  editProduct(product: any): void {
    this.currentProduct = { ...product }; 
    this.isEditing = true; 
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateProduct();
    } else {
      this.createProduct(this.currentProduct);
    }
  }

  updateProduct(): void {
    if (!this.currentProduct.id) {
      console.error('Invalid product ID for update.');
      return;
    }

    this.loading = true;
    this.http
      .put<any>(
        `https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/api/products/${this.currentProduct.id}`,
        this.currentProduct
      )
      .subscribe(
        (data) => {
          console.log('Product updated:', data);
          const index = this.products.findIndex((p) => p.id === this.currentProduct.id);
          if (index !== -1) {
            this.products[index] = { ...data.product };
          }
          this.isEditing = false; 
          this.currentProduct = { name: '', description: '', price: 0, quantity: 0 }; 
          this.loading = false;
        },
        (error) => {
          console.error('Error updating product:', error);
          this.errorMessage = 'Failed to update product. Please try again later.';
          this.loading = false;
        }
      );
  }
}
