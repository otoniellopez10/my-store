import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total: number = 0

  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: 'https://source.unsplash.com/random'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: 'https://source.unsplash.com/random'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: 'https://source.unsplash.com/random'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: 'https://source.unsplash.com/random'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddToShoppingCart(product: Product) {
    this.myShoppingCart.push(product)
    this.total += product.price
  }

}
