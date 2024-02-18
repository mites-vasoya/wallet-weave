import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GoogleChartsModule } from 'angular-google-charts';
import { LoginComponent } from './user/login/login.component';
import {NavBtnHoverDirective} from "./shared/directives/navBtnHover.directive";
import {SignupComponent} from "./user/signup/signup.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./service/auth-guard.service";
import {AuthService} from "./service/auth.service";
import {ApiService} from "./service/api.service";
import {ReactiveFormsModule} from "@angular/forms";


const appRoute : Routes = [
  {path : "", canActivate : [AuthGuard], component : DashboardComponent},
  {path : "login", component: LoginComponent},
  {path : "signup",  component: SignupComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    NavBtnHoverDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    GoogleChartsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
