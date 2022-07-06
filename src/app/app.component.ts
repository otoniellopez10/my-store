import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  token = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService
  ) { }

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
}
