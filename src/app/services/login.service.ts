import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginInterface } from "app/interfaces/login.nterface";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  apiUrl = "https://localhost:7001/api/Token";
  constructor(private http: HttpClient) {}
  Login = (user: any): Observable<LoginInterface> => {
    return this.http.post<LoginInterface>(this.apiUrl, user);
  };
}
