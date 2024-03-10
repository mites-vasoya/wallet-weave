import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {NewEntryComponent} from "../new-entry/new-entry.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public isUserLoggedIn : boolean = false;

  constructor(public authService: AuthService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
      this.authService.isLoggedInSubject.subscribe((isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
      })

    this.isUserLoggedIn = this.authService.isUserLoggedIn;
    // this.openNewEntrySheet('0ms', '0ms');
  }


  onLogOut() {
    // console.log("-----Logout Clicked-----");
    this.authService.logout();
    this.isUserLoggedIn = false;
    this.router.navigate(["/login"]).then(r => console.log("Login : ", r));
  }

  openNewEntrySheet(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(NewEntryComponent, {
      // minHeight : "51vh",
      height: "fit-content",
      maxHeight : "51vh",
      minWidth: "40vw",
      maxWidth: "60vw",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
