import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false
  counter: number = 0;
  profile: User | null = null

  categories: Category[] = []


  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories()
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndgetProfile("otoniel@gmail.com", "123456")
      .subscribe({
        next: user => {
          this.profile = user;
        },
        error: err => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error',
          })
        }
      }
      );
  }

  getAllCategories() {
    this.categoriesService.getAll()
      .subscribe({
        next: categories => {
          this.categories = categories;
        }
      }
      );
  }
}
