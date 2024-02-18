import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constant';

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

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${API_URL + 'auth/login'}`, {
      email: email,
      password: password,
    });
  }

  saveUserDetails(userDetails: {}) {
    localStorage.setItem('user_details', JSON.stringify(userDetails));
  }

  getUserDetails() {
    let user_details = localStorage.getItem('user_details');
    return user_details == null ? '{}' : user_details;
  }

  clearUserDetails() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    let user_details = JSON.parse(this.getUserDetails());
    return Object.keys(user_details).length > 0 ? true : false;
  }
}
