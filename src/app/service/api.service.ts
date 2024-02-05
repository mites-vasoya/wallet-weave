import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  listUsersWallet = "http://localhost:4500/users_wallet/list";
  constructor(private http : HttpClient) { }

  fetchUsersWallet(user_id : number): Observable<any>{
    return this.http.post<any>(`${this.listUsersWallet}`, {user_id : user_id});
  }
}
