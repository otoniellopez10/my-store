import { Component, EventEmitter, Input, Output } from '@angular/core';
import { zip } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model'
import Swal from 'sweetalert2';


import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total: number = 0

  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();

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
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading'
    this.productsService.getProduct(id)
      .subscribe({
        next: (data: Product) => {
          console.log('Open', data)
          this.productDetail = data;
          this.toggleProductDetail();
          this.statusDetail = 'success'
        },
        error: errorMsg => {
          this.statusDetail = 'error'
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMsg
          })
        }
      })
  }


  readAndUpdate(id: string) {
    // Para hacer peticiones que dependen una de la otra
    this.productsService.getProduct(id)
      .pipe(
        switchMap(product => {
          return this.productsService.update(id, { title: 'New title' })
        })
      )
      .subscribe(data => {
        console.log(data)
      })

    // Para hacer peticiones al mismo tiempo
    zip(
      this.productsService.getProduct(id),
      this.productsService.update(id, { title: 'New title' })
    )
      .subscribe(response => {
        const read = response[0]
        const update = response[1]
      })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Descripcion del producto',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 100,
      categoryId: 2
    }

    this.productsService.create(product)
      .subscribe(data => {
        console.log(data)
        this.products.unshift(data)
      })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'New title'
    }

    const id = this.productDetail.id
    this.productsService.update(id, changes)
      .subscribe(data => {
        console.log('updated: ', data)
        const productIndex = this.products.findIndex(product => product.id === this.productDetail.id)
        this.products[productIndex] = data
        this.productDetail = data
      })
  }

  deleteProduct() {
    const id = this.productDetail.id
    this.productsService.detele(id)
      .subscribe(data => {
        console.log('deleted: ', data)
        const productIndex = this.products.findIndex(product => product.id === id)
        this.products.splice(productIndex, 1)
        this.toggleProductDetail()
      })
  }

  onLoadMore() {
    this.loadMore.emit()
  }
}
