import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public isUserLoggedIn : boolean = false;

  constructor(public authService : AuthService, private router : Router) {}

  ngOnInit(): void {
      this.authService.isLoggedInSubject.subscribe((isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
      })
  }

  onLogOut() {
    // console.log("-----Logout Clicked-----");
    this.authService.logout();
    this.isUserLoggedIn = false;
    this.router.navigate(["/login"])
  }
}
