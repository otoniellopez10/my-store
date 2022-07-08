import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User, CreateUserDTO } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/api`

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO) {
    return this.http.post<User>(`${this.apiUrl}/users/`, dto);
  }

  getAll(dto: CreateUserDTO) {
    return this.http.get<User[]>(`${this.apiUrl}/users/`);
  }
}
