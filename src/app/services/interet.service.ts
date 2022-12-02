import { InteretInterface } from "../interfaces/interet.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { getToken } from "app/partage/storageLocal";

@Injectable({
  providedIn: "root",
})
export class InteretService {
  apiUrl = "https://localhost:7001/api/Interests";
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}
  getinterets = (): Observable<InteretInterface[]> => {
    return this.http.get<InteretInterface[]>(this.apiUrl, this.httpOptions);
  };
  createinteret = (interet: InteretInterface): Observable<InteretInterface> => {
    return this.http.post<InteretInterface>(
      this.apiUrl,
      interet,
      this.httpOptions
    );
  };
  updateinteret = (
    id: number,
    interet: InteretInterface
  ): Observable<InteretInterface> => {
    return this.http.put<InteretInterface>(
      this.apiUrl + "/" + id,
      interet,
      this.httpOptions
    );
  };
  /*   getinteretById = (id: number): Observable<InteretService> => {
    return this.http.get<InteretService>(this.apiUrl + "/" + id);
  }; */
  deleteinteret = (id: number) => {
    return this.http.delete(this.apiUrl + "/" + id, this.httpOptions);
  };
}
