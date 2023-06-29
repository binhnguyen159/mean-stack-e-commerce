import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  apiURLCategories = environment.apiURL + '/api/v1/categories';

  getCategories(): Observable<Category[]> {
    console.log('environment.apiURL', environment.apiURL);
    return this.httpClient.get<Category[]>(`${this.apiURLCategories}`);
  }

  getDetailCategory(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.apiURLCategories}/${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.apiURLCategories}`, category);
  }

  deleteCategory(categoryId: string): Observable<object> {
    return this.httpClient.delete<object>(
      `${this.apiURLCategories}/${categoryId}`
    );
  }

  updateCategory(category: Category): Observable<object> {
    return this.httpClient.put<object>(
      `${this.apiURLCategories}/${category.id}`,
      category
    );
  }
}
