import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

// Services
import { ProductsService } from 'src/app/services/products.service';

// models
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null
  limit: number = 10
  offset: number = 0
  products: Product[] = []

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id')
      if (this.categoryId) {
        this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          .subscribe({
            next: data => {
              this.products = data
            },
            error: err => {
              Swal.fire({
                title: 'Error',
                text: err.error.message,
                icon: 'error',
              })
            }
          })

      }
    });
  }

  onLoadMore() {
    if (this.categoryId) {
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe({
          next: data => {
            this.products = [...this.products, ...data]
            this.offset += this.limit
          },
          error: err => {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error',
            })
          }
        })
    }
  }

}
