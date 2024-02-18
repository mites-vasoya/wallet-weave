import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string = "";
  password: string = "";
  userDetails : {} = {};
  isUserLoggedIn : boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router : Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log("Login Component", this.authService.isLoggedIn());
    if(this.authService.isLoggedIn()) {
      this.router.navigate(["/"])
    }

  }

  loginBtn(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  onSubmit() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;

    this.authService.login(this.email, this.password).subscribe((data : any) => {
      this.userDetails = data;
      this.authService.saveUserDetails(data.data[0]);

      this.router.navigate(['/']);
    })
  }
}
