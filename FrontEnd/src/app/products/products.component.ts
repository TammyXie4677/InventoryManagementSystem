import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  productForm: FormGroup;
  editingProductId: number | null = null;

  private apiUrl = 'http://127.0.0.1:5000/products'; // Flask backend URL
  private token = localStorage.getItem('token'); // Assume the token is stored during login

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
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
        console.error('Error fetching products:', err);
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
        console.error('Error adding product:', err);
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
        console.error('Error updating product:', err);
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
        console.error('Error deleting product:', err);
      },
    });
  }
}
