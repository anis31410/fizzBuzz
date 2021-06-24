import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor( private http :  HttpClient) { }

  getData() {
    return this.http.get('/api/numbers/getNumbers')
  }

  sendNumber(number: Number) {
    return this.http.post(`/api/numbers/addNumber/${number}`, null)
  }
}
