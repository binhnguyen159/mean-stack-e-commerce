import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  apiURLProducts = environment.apiURL + '/products';

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiURLProducts}`);
  }
  getTotalProducts(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURLProducts}/get/count`);
  }

  getDetailProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiURLProducts}/${id}`);
  }

  addProduct(product: FormData): Observable<Product> {
    console.log({ product });
    return this.httpClient.post<Product>(`${this.apiURLProducts}`, product);
  }

  deleteProduct(productId: string): Observable<object> {
    return this.httpClient.delete<object>(
      `${this.apiURLProducts}/${productId}`
    );
  }

  updateProduct(product: FormData): Observable<object> {
    return this.httpClient.put<object>(
      `${this.apiURLProducts}/${product.get('id')}`,
      product
    );
  }
}
