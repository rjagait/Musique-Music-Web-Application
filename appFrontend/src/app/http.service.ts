import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  Username: string = '';
  Password: string = '';

  constructor(private http: HttpClient, private _http: HttpService) { }

}
