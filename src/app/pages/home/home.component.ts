import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service'

import { Product } from '../../models/product.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = []
  limit: number = 10
  offset: number = 0

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts(this.limit, this.offset)
      .subscribe(data => {
        this.products = data;
        this.offset += this.limit
      })
  }

  loadMore() {
    this.productsService.getProducts(this.limit, this.offset)
      .subscribe(data => {
        this.products = [...this.products, ...data]
        this.offset += this.limit
      })
  }

}
