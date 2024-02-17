import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string = "";
  password: string = "";
  userDetails : {} = {}
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginBtn(email: string, password: string) {
    this.email = email;
    this.password = password;

    console.log("Email & Password : ", this.email, this.password);
  }

  onSubmit() {
    console.log("Login Form Values : ", this.loginForm.value);
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;

    this.authService.login(this.email, this.password).subscribe((data : any) => {
      this.userDetails = data;
      console.log(this.userDetails);
    })
  }
}
