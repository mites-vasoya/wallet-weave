import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../constant";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // listUsersWallet = "http://localhost:4500/";
  constructor(private http : HttpClient) { }

  fetchUsersWallet(user_id : number): Observable<any>{
    return this.http.post<any>(`${API_URL + "users_wallet/list"}`, {user_id : user_id});
  }

  fetchDashboardData(user_id : number) : Observable<any> {
    return this.http.post<any>(`${API_URL + "users_wallet/list"}`, {user_id : user_id})
  }
}
