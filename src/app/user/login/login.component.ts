import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email : string = "";
  password : string = "";

loginBtn(email : string, password : string) {
  this.email = email;
  this.password = password;

  console.log("Email & Password : ", this.email, this.password);
}
}
