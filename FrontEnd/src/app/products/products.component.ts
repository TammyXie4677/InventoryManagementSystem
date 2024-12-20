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
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    } else {
      this.isLoggedIn = false;
    }
  }

  checkLoginStatus() {
    this.token = localStorage.getItem('token');
    this.isLoggedIn = !!this.token;

    if (this.isLoggedIn) {
      this.loadProducts();
    }
  }

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  loadProducts(): void {
    this.http.get<any[]>(this.apiUrl, this.getAuthHeaders()).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to fetch products:', err);
      },
    });
  }

  addProduct(): void {
    const productData = this.productForm.value;
    this.http.post(this.apiUrl, productData, this.getAuthHeaders()).subscribe({
      next: () => {
        this.loadProducts();
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Failed to add product:', err);
      },
    });
  }

  editProduct(product: any): void {
    this.editingProductId = product.id;
    this.productForm.patchValue(product);
  }

  updateProduct(): void {
    const productData = this.productForm.value;
    const url = `${this.apiUrl}/${this.editingProductId}`;
    this.http.put(url, productData, this.getAuthHeaders()).subscribe({
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

  deleteProduct(productId: number): void {
    const url = `${this.apiUrl}/${productId}`;
    this.http.delete(url, this.getAuthHeaders()).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
      },
    });
  }
}
