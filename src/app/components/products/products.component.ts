import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model'

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total: number = 0

  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);
  showProductDetail = false
  productDetail: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    category: {
      id: '',
      name: ''
    },
    description: ''
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe(data => {
        this.products = data;
      })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id)
      .subscribe(data => {
        console.log(data)
        this.productDetail = data;
        this.toggleProductDetail();
      })
  }
}
