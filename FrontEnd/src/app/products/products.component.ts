import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  isLoggedIn: boolean = false;
  products: any[] = [];
  productForm: FormGroup;
  editingProductId: number | null = null;

  private apiUrl = 'https://inventorymanagementsystem-36d14bdeb358.herokuapp.com/products'; // Flask backend URL
  private token: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
    });

    // Check platform and login status
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    } else {
      this.isLoggedIn = false;
    }
  }

  // Check if the user is logged in
  checkLoginStatus(): void {
    this.token = localStorage.getItem('token');
    this.isLoggedIn = !!this.token;

    if (this.isLoggedIn) {
      this.loadProducts();
    }
  }

  // Generate headers with the authorization token
  private getAuthHeaders(): { headers: HttpHeaders } {
    if (!this.token) {
      console.error('Token is not available');
      return { headers: new HttpHeaders() };
    }

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  // Load the list of products
  loadProducts(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(this.apiUrl, headers).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to fetch products:', err);
      },
    });
  }

  // Add a new product
  addProduct(): void {
    const productData = this.productForm.value;
    const headers = this.getAuthHeaders();

    this.http.post(this.apiUrl, productData, headers).subscribe({
      next: () => {
        this.loadProducts();
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Failed to add product:', err);
      },
    });
  }

  // Edit an existing product
  editProduct(product: any): void {
    this.editingProductId = product.id;
    this.productForm.patchValue(product);
  }

  // Update an existing product
  updateProduct(): void {
    const productData = this.productForm.value;
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${this.editingProductId}`;

    this.http.put(url, productData, headers).subscribe({
      next: () => {
        this.loadProducts();
        this.editingProductId = null;
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Failed to update product:', err);
      },
    });
  }

  // Delete a product
  deleteProduct(productId: number): void {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${productId}`;

    this.http.delete(url, headers).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
      },
    });
  }
}
