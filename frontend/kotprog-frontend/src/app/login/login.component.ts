import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    
  }

  email: string = "";
  password: string = "";
  loginError: boolean = false;
  
  async login(email: string, password:string) {
    const successful = await this.loginService.signIn(email, password);
    if(successful) {
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }
  getUserSignedIn() {
    return this.loginService.getUserSignedIn();
  }

}
