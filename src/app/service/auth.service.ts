import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../constant";

interface UserData {
  username: string;
  email: string;
  mobile: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData: UserData = {
    username: "Hari",
    email: "hari@gmail.com",
    mobile: 9900990099
  }

  public isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(this.isUserLoggedIn)
      }, 5000);
    });
  }

  login(email : string, password: string) {
    return this.http.post<any>(`${API_URL + "auth/login"}`, {email : email, password : password});
  }
}
