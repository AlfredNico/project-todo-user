import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user_I } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _http: HttpClient) {}

  getAll() {
    return this._http.get<user_I[]>(`${environment.BASE_URL}/users`);
  }

  getOne(id: any) {
    return this._http.get<user_I>(`${environment.BASE_URL}/users/${id}`);
  }

  remove(id: any) {
    return this._http.delete<{ message: string }>(
      `${environment.BASE_URL}/users/${id}`
    );
  }

  add(user: any) {
    return this._http.post<{ message: string }>(
      `${environment.BASE_URL}/users`,
      user
    );
  }

  update(id: number, user: any) {
    return this._http.put<{ message: string }>(
      `${environment.BASE_URL}/users/${id}`,
      user
    );
  }
}
