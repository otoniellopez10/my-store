import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model'
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
    return this.http.get<Product[]>(`${this.apiUrl}/products/`, { params });
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
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
