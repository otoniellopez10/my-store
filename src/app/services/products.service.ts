import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model'
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`

  constructor(
    private http: HttpClient
  ) { }

  getProducts(limit?: number, offset?: number) {
    console.log(limit, offset)
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products/`, { params, context: checkTime() })
      .pipe(
        map(products => products.map(item => {
          return {
            ...item,
            taxes: 0.19 * item.price
          }
        }))
      )
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError(() => new Error('Algo fallo en el servidor'));
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error('No se encontro el producto'));
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => new Error('No tienes permisos para ver este producto'));
          }
          return throwError(() => new Error('Ups! Something went wrong.'));
        })
      )
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products/`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {

    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  detele(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
