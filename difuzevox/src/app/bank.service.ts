import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) {

   }

  /**
   * getBankDetails
   */
  public getBankDetails() {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get('http://localhost:4300/bank');
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
  }

}
