import { Component, Input, OnInit } from '@angular/core';
import { PackageModel } from '../../customers-pr-models';

@Component({
  selector: 'app-packages-customer',
  templateUrl: './packages-customer.component.html',
  styleUrls: ['./packages-customer.component.css']
})
export class PackagesCustomerComponent implements OnInit {

  @Input() packages: Array<PackageModel>;
  @Input() packagesDst: Array<PackageModel>;

  translations = {
    ColPackageName: "שם חבילה"
    ,  ColPackageAmount: "כמות (ביחידות) "
    , ColPackageUsed: "ניצול (ביחידות)"

  }
  constructor() { }

  ngOnInit(): void {
    // console.log("packages", this.packages);
    // console.log("isArray()", Array.isArray(this.packages));  
    // console.log("Object.entries", Object.entries(this.packages) );
    this.packagesDst = new Array<PackageModel>();
    this.packages.forEach((item) => {
      // console.log(item)
      let p :PackageModel = {id:item.id, name:item.name, amount:item.amount, used:item.used};
      this.packagesDst.push(p);
    })

  }

}
