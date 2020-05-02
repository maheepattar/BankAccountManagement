import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountServiceService {

  constructor(private http : HttpClient) { }

  postBankAccount(formData) {
    return this.http.post(environment.baseAPIUrl+'BankAccount', formData);
  }

  putBankAccount(formData) {
    return this.http.put(environment.baseAPIUrl+ 'BankAccount/' + formData.bankAccountId, formData);
  }

  getBankAccountList(){
    return this.http.get(environment.baseAPIUrl + 'BankAccount');
  }

  deleteBankAccount(id) {
    return this.http.delete(environment.baseAPIUrl+'BankAccount/'+ id);
  }
}