import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { FormatWidth } from '@angular/common';
import { BankServiceService } from '../shared/bank-service.service';
import { BankAccountServiceService } from '../shared/bank-account-service.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  constructor(private fb : FormBuilder, private bankService : BankServiceService,
              private service : BankAccountServiceService) { }

  bankAccountForms : FormArray = this.fb.array([])
  bankList = [];
  notification  = null;

  ngOnInit() {
    this.bankService.getBankList().subscribe( res => this.bankList = res as []);
    this.service.getBankAccountList().subscribe(
      res => {
        if(res == [])
          this.addBankAccountForms();
        else{
          (res as []).forEach((bankAccount : any) => {
            this.bankAccountForms.push(this.fb.group({
              bankAccountId : [bankAccount.bankAccountId],
              accountNumber : [bankAccount.accountNumber, Validators.required],
              accountHolder : [bankAccount.accountHolder, Validators.required],
              bankId : [bankAccount.bankId, Validators.min(1)],
              ifsc : [bankAccount.ifsc,Validators.required]
            }))
          })
        }
      }
    )
  }

  addBankAccountForms(){
    this.bankAccountForms.push(this.fb.group({
      bankAccountId : [0],
      accountNumber : ['', Validators.required],
      accountHolder : ['', Validators.required],
      bankId : [0, Validators.min(1)],
      ifsc : ['',Validators.required]
    }))
  }

  recordSubmit(fg){
    if(fg.value.bankAccountId == 0){
      this.service.postBankAccount(fg.value).subscribe(
        (res:any) => {
          fg.patchValue({ bankAccountId : res.bankAccountId });
          this.showNotification('insert');
        });
    }
    else{
      this.service.putBankAccount(fg.value).subscribe(
        (res:any) => {
          this.showNotification('update');
        });
    }
  }

  onDelete(bankAccountId, i){
    if(bankAccountId == 0)
      this.bankAccountForms.removeAt(i);
    else if(confirm('Are you want to delete this record ? '))
      this.service.deleteBankAccount(bankAccountId).subscribe(
      res => {
        this.bankAccountForms.removeAt(i);
        this.showNotification('delete');
      }
    )
  }

  showNotification(catagory){
    switch (catagory) {
      case 'insert':
        this.notification = {class:'text-success', message:'Saved!'};
        break;
      case 'update':
        this.notification = {class: 'text-primary', message:'Updated!'};
        break;
      case 'delete':
      this.notification = {class : 'text-danger', message:'Deleted!'};
      break;
      default:
        break;
    }
    
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
}
