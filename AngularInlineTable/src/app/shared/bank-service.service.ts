import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankServiceService {

  constructor(private http : HttpClient) { }

  getBankList(){
    return this.http.get(environment.baseAPIUrl + 'bank');    
  }
}
