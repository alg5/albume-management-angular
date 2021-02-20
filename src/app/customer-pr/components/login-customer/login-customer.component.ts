import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrCustomersService } from 'src/app/core/services/pr-customers.service';
import { CustomerPrModel, CustomerPrStorage, LOCAL_STORAGE_CUSTOMER_PR_KEY } from 'src/app/customer-pr/customers-pr-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent implements OnInit {
  lastTime: string;
  lastDate:string;
  username:string;
  userid: string;
  errorCode: number;
  errorMessage: string;
  user: CustomerPrModel;

  rForm: FormGroup;

  translations = {
    CustomerName : " אורח"
    , LastVisit: " כניסה אחרונה"
    , ErrorMessage: "המשתמש לא נמצא"

  }
  constructor(private datePipe: DatePipe
              , private fb: FormBuilder
              , private router: Router
              , private prCustomersService: PrCustomersService
    ) 
    { 
      this.user =  prCustomersService.getCurrentUser();
      if (this.user){
        this.router.navigate([`customer-pr/abonents/${this.user.id}`]);
      }

    }


    ngOnInit(): void {
      const now = Date();
      this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
      this.lastTime = this.datePipe.transform(now, 'shortTime');
      this.rForm = this.fb.group({
        'userid' : [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
  
      });
    }
  
    sendLogin()
    {
      this.userid =  this.rForm.get('userid').value
      console.log("sendLogin", this.userid);
      this.getLoginFromApi();
  
    }
    getLoginFromApi(){
      
    
      // this.prCustomersService.login(this.userid )
      this.prCustomersService.loginLocal(this.userid )
        .subscribe(
                data => {
                    console.log(" login data: ", data); 
                    if(!data)
                    {
                      this.errorCode = -1; //TODO
                      return;
                    }
                    if(data &&  data.ErrorCode < 0) {
                     this.errorMessage =  this.translations.ErrorMessage;
                      return;
                    }
                    this.user = data.GetUserById;
                    console.log(" login data: user ",  this.user); 
                    const currentCustomer:CustomerPrStorage = {user: this.user, timestamp: new Date()};
                    localStorage.setItem (LOCAL_STORAGE_CUSTOMER_PR_KEY, JSON.stringify(currentCustomer));
                    this.router.navigate([`customer-pr/abonents/${this.user.id}`]);
  
                 },
                error => {
                  //TODO
                    // this.loading = false;
      });
  
    }

}
