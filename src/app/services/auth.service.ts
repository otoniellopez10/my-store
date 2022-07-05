import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, CreateUserDTO } from '../models/user.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password });
  }

  getProfile(token: string) {
    // let headers = new HttpHeaders()
    // headers.set('Authorization', `Bearer ${token}`);
    // headers = headers.set('Content-type', 'application/json');
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  loginAndgetProfile(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(token => {
          return this.getProfile(token.access_token);
        })
      )

  }
}
