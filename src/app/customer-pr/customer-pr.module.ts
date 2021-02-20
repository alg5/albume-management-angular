import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPrRoutingModule } from './customer-pr-routing.module';
// import { CustomerPrComponent } from './customer-pr.component';
import { LoginCustomerComponent } from './components/login-customer/login-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AbonentsCustomerComponent } from './components/abonents-customer/abonents-customer.component';
import { PackagesCustomerComponent } from './components/packages-customer/packages-customer.component';


@NgModule({
  declarations: [LoginCustomerComponent, AbonentsCustomerComponent, PackagesCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerPrRoutingModule,
    ReactiveFormsModule,

  ]
})
export class CustomerPrModule { }
