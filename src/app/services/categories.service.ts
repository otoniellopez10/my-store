import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { } from 'rxjs/operators';

import { Category } from '../models/product.model'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.API_URL}/api/categories`
  limit: number = 10
  offset: number = 0

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Category[]>(this.apiUrl, { params })
  }
}
