import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constant';
import { BehaviorSubject, Subject } from 'rxjs';

interface UserData {
  username: string;
  email: string;
  mobile: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'userLoggedIn';
  public userData: UserData = {
    username: 'Hari',
    email: 'hari@gmail.com',
    mobile: 9900990099,
  };

  public isUserLoggedIn: boolean = false;
  public  isLoggedInSubject = new Subject<boolean>();
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = this.checkLoginStatus();
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${API_URL + 'auth/login'}`, {
      email: email,
      password: password,
    });
  }

  logout() {
    this.clearUserDetails();
  }

  signup(userDetails : {first_name : string, last_name : string, email : string, password : string} []) {
    return this.http.post<any>(`${API_URL + 'auth/signup'}`, userDetails);
  }

  saveUserDetails(userDetails: {}) {
    localStorage.setItem('user_details', JSON.stringify(userDetails));
    localStorage.setItem(this.STORAGE_KEY, 'true');
    this.isUserLoggedIn  = true;
    this.isLoggedInSubject.next(this.checkLoginStatus());
  }

  getUserDetails() {
    let user_details = localStorage.getItem('user_details');
    return user_details == null ? '{}' : user_details;
  }

  clearUserDetails() {
    localStorage.clear();
    localStorage.removeItem(this.STORAGE_KEY);
    this.isUserLoggedIn  = false;
    this.isLoggedInSubject.next(this.checkLoginStatus());
  }

  userLoginStatus() {
    return this.isUserLoggedIn;
  }

  private checkLoginStatus(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}
