import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { User, CreateUserDTO } from './../models/user.model';
import { Auth } from './../models/auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  private user = new BehaviorSubject<User | null>(null)
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token))
      );
  }

  logout() {
    this.tokenService.removeToken();
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap(user => this.user.next(user))
      )
  }

  loginAndgetProfile(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getProfile())
      );
  }
}
