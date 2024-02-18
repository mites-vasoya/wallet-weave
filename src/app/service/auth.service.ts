import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constant';
import { BehaviorSubject } from 'rxjs';

interface UserData {
  username: string;
  email: string;
  mobile: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: UserData = {
    username: 'Hari',
    email: 'hari@gmail.com',
    mobile: 9900990099,
  };

  public isUserLoggedIn: boolean = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${API_URL + 'auth/login'}`, {
      email: email,
      password: password,
    });
  }

  logout() {
    this.clearUserDetails();
  }

  saveUserDetails(userDetails: {}) {
    localStorage.setItem('user_details', JSON.stringify(userDetails));
    this.isLoggedInSubject.next(true);
  }

  getUserDetails() {
    let user_details = localStorage.getItem('user_details');
    return user_details == null ? '{}' : user_details;
  }

  clearUserDetails() {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
