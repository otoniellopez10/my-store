import { Component } from '@angular/core';

import Swal from 'sweetalert2';

import { onExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor() { }

  onExit() {
    const rta = Swal.fire({
      title: 'Are you sure?',
      text: 'if you leave you will lose everything',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Exit',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    })
    return rta;
  }
}
