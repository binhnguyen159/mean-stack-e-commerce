import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  apiURLUsers = environment.apiURL + '/users';

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiURLUsers}`);
  }
  getTotalUsers(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURLUsers}/count/customers`);
  }

  getDetailUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiURLUsers}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${this.apiURLUsers}/authen/register`,
      user
    );
  }

  deleteUser(userId: string): Observable<object> {
    return this.httpClient.delete<object>(`${this.apiURLUsers}/${userId}`);
  }

  updateUser(user: User): Observable<object> {
    return this.httpClient.put<object>(`${this.apiURLUsers}/${user.id}`, user);
  }
}
