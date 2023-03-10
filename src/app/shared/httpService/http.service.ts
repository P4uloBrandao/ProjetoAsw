import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HttpService{
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080';

  public login(data: any) : Observable<any>{
    return this.http.post(this.url+"/login", data)
  }

  public register(data: any) : Observable<any>{
    return this.http.post(this.url+"/register", data)
  }

  public getUserById(userId: string): Observable<any> {
    const newUrl = this.url + `/users/${userId}`;
    console.log(newUrl);
    
    return this.http.get<any>(newUrl);
  }
}
