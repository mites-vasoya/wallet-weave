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
      this.isUserLoggedIn = this.authService.isLoggedIn();
      this.router.events.subscribe((val : any) => {
        // if (this.authService.isUserLoggedIn) {
        //   this.isUserLoggedIn = true;
        // } else {
        //   this.isUserLoggedIn = false;
        // }
      })
  }

  onLogOut() {
    // console.log("-----Logout Clicked-----");
    this.authService.logout();
    this.isUserLoggedIn = false;
    this.router.navigate(["/login"])
  }
}
