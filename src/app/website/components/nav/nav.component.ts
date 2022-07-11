import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
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
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories()
    this.authService.user$
      .subscribe(user => {
        this.profile = user;
      })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndgetProfile("admin@mail.com", "admin123")
      .subscribe({
        next: user => {
          this.router.navigate(['/profile'])
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

  logout() {
    this.authService.logout()
    this.profile = null
    this.router.navigate(['/home'])
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
