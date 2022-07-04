import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  onLoaded(url: string) {
    console.log('log padre' + url)
  }

  createUser() {
    this.usersService.create({
      name: 'Otoniel',
      email: 'otoniellopez10@gmail.com',
      password: '123'
    })
      .subscribe(rta => {
        console.log(rta);
      })
  }

  login() {
    this.authService.login('otoniellopez10@gmail.com', '123')
      .subscribe(rta => {
        console.log(rta.access_token);
      })
  }
}
