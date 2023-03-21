import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService{
  constructor(private http: HttpClient) {}

  public post(link: string, data: any) : Observable<any>{
    return this.http.post(link, data)
  }

  public get(link: string) : Observable<any>{
    return this.http.get(link);
  }
}
