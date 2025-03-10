import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string = '';
  products: any[] = [];
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

        // If the token is valid, set the user as logged in
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

        // Reset productData fields
        productData.name = '';
        productData.description = '';
        productData.price = 0; 
        productData.quantity = 0; 
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
          this.products = this.products.filter((product) => product.id !== productId); // 从本地列表中移除已删除的产品
          this.loading = false; 
        },
        (error) => {
          console.error('Error deleting product:', error);
          this.errorMessage = 'Failed to delete product. Please try again later.';
          this.loading = false; 
        }
      );
  }  

  editingProduct: any = null;

setEditingProduct(product: any) {
  this.editingProduct = { ...product }; 
}

cancelEdit() {
  this.editingProduct = null;
}

updateProduct() {
  if (!this.editingProduct) return;

  const payload = { ...this.editingProduct, email: this.email };
  this.loading = true;

  this.http
    .put<any>(
      `https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/api/products/${this.editingProduct.id}`,
      payload
    )
    .subscribe(
      (data) => {
        console.log('Product updated:', data);
        const index = this.products.findIndex((p) => p.id === this.editingProduct.id);
        if (index > -1) this.products[index] = data.product; 
        this.editingProduct = null; 
        this.loading = false;
      },
      (error) => {
        console.error('Error updating product:', error);
        this.errorMessage = 'Failed to update product. Please try again.';
        this.loading = false;
      }
    );
}
}
