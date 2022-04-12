import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  email = "";
  password = "";
  password2 = "";
  registerError = false;
  defaultErrorMessage = "Error creating account";
  errorMessage = this.defaultErrorMessage;
  async register() {
    if(this.password !== this.password2) {
      this.errorMessage = "Passwords must match";
      this.registerError = true;
    } else if(this.password.length < 6) {
      this.errorMessage = "Minimum password length is 6";
      this.registerError = true;
    } else {
      const succesful = await this.auth.signUp(this.email, this.password); 
      if(succesful) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = this.defaultErrorMessage;
      }
    }
  }

}
