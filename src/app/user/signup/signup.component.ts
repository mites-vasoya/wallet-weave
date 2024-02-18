import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  userDetails : {first_name : string, last_name : string, email : string, password : string} = {
    first_name : "",
    last_name : "",
    email : "",
    password : "",
  }
  public registerForm : FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }
  onSubmit() {
     this.userDetails.first_name = this.registerForm.value.first_name;
     this.userDetails.last_name = this.registerForm.value.last_name;
    this.userDetails.email = this.registerForm.value.email;
     this.userDetails.password = this.registerForm.value.password;

     console.log("User Details : ", this.userDetails);
  }

}

