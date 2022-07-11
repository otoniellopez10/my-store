import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = '';
  token = '';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile()
        .subscribe()
    }
  }

  onLoaded(url: string) {
    console.log('log padre' + url)
  }

  createUser() {
    this.usersService.create({
      name: 'Otoniel',
      email: 'otoniel@gmail.com',
      password: '123456'
    })
      .subscribe({
        next: rta => {
          console.log(rta);
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


  downloadPDF() {
    this.filesService.getFile('test.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0)
    if (file) {
      this.filesService.uploadFile(file)
        .subscribe({
          next: rta => {
            this.imgRta = rta.location;
          }
        })
    }
  }
}
