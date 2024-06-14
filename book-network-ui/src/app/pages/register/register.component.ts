import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private router: Router, private authService: AuthenticationService){

  }

  registerRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '' }
  errorMsg: Array<string> = []

  login() {
    this.router.navigate(['login'])
  }
  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({next: ()=>{
      this.router.navigate(['activate-account'])
    }, error: (err)=> {
      this.errorMsg = err.error.validationErrors;
    }})
  }

}