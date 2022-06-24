import { Component } from '@angular/core';
import { Product } from './models/product.model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

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

  onLoaded(url: string) {
    console.log('log padre' + url)
  }
}
