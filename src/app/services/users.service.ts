import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInterface } from "app/interfaces/user.interface";
import { getToken } from "app/partage/storageLocal";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  apiUrl = "https://localhost:7001/api/Users";

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    }),
  };
  httpOption = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + getToken(),
    }),
  };

  getUsers = (): Observable<UserInterface[]> => {
    return this.http.get<UserInterface[]>(this.apiUrl, this.httpOptions);
  };
  createUser = (user: UserInterface): Observable<UserInterface> => {
    return this.http.post<UserInterface>(this.apiUrl, user, this.httpOptions);
  };
  updateUser = (id: number, user: UserInterface): Observable<UserInterface> => {
    return this.http.put<UserInterface>(
      this.apiUrl + "/" + id,
      user,
      this.httpOptions
    );
  };
  getUserById = (id: number): Observable<UserInterface> => {
    return this.http.get<UserInterface>(
      this.apiUrl + "/" + id,
      this.httpOptions
    );
  };
  deleteUser = (id: number): Observable<UserInterface> => {
    return this.http.delete<UserInterface>(
      this.apiUrl + "/" + id,
      this.httpOptions
    );
  };

  sendImage = (data: any): Observable<any> => {
    return this.http.post<any>(
      "https://localhost:7001/api/Files",
      data,
      this.httpOption
    );
  };

  getImage = (name: string): Observable<any> => {
    return this.http.get<any>(
      "https://localhost:7001/api/Files/" + name,
      this.httpOptions
    );
  };
}
