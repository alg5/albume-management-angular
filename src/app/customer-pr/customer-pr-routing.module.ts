import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonentsCustomerComponent } from './components/abonents-customer/abonents-customer.component';
import { LoginCustomerComponent } from './components/login-customer/login-customer.component';


const routes: Routes = [
  
  {path: 'abonents/:id', component: AbonentsCustomerComponent, },

  
  { path: '', component: LoginCustomerComponent
  // , children: [
  //   { 
  //     path: 'abonents/:id', 
  //     component: AbonentsCustomerComponent
  //    },
  //   // { 
  //   //   path: '/product', 
  //   //   component: AboutItemComponent 
  //   // }
  // ] 
},
  // {path: 'loginpr1', component: CustomerPrComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPrRoutingModule { }
