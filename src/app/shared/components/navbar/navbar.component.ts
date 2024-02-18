import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isUserLoggedIn : boolean = false;

  constructor(private authService : AuthService, private router : Router, private subscription: Subscription) {}

  ngOnInit(): void {
      this.isUserLoggedIn = this.authService.isLoggedIn();
      this.subscription = this.authService.getLoggedInState().subscribe((loggedIn: boolean) => {
        this.isUserLoggedIn = loggedIn;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  onLogOut() {
    // console.log("-----Logout Clicked-----");
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
