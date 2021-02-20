import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbonementModel, CustomerPrModel, PackageModel } from 'src/app/customer-pr/customers-pr-models';
import { PrCustomersService } from 'src/app/core/services/pr-customers.service';

@Component({
  selector: 'app-abonents-customer',
  templateUrl: './abonents-customer.component.html',
  styleUrls: ['./abonents-customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AbonentsCustomerComponent implements OnInit {


  lastTime: string;
  lastDate:string;
  user: CustomerPrModel;
  username:string;
  expandedElement: AbonementModel | null;
  translations = {
    CustomerName : " אורח"
    , LastVisit: " כניסה אחרונה"
    , ErrorMessage: "המשתמש לא נמצא"
    , ColAbonementName: "שם מנוי"

  }
  constructor(private datePipe: DatePipe
            , private prCustomersService: PrCustomersService
            , private router: Router
    ) 
  { 
    this.user =  prCustomersService.getCurrentUser();
    if (!this.user){
      this.router.navigate([`customer-pr`]);
    }
  }

  ngOnInit(): void {
    const now = Date();
    this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
    this.lastTime = this.datePipe.transform(now, 'shortTime');
    this.username = this.user.username;
    // console.log("user", this.user);
    // console.log("abonents", this.user.abonements);
  }
  onExpanded(id:number)
  {
    console.log ("onExpanded", id, this.expandedElement);
    if(this.expandedElement){
      // this.httpService.subjectPaperDetails.next(new SubjectPaperDetails(id, shape));
    }
    else{
      // this.paperDetails = null;
      // this.paperDetailsError = 0;
    }
  }

}
