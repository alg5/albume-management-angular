import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomerPrAPI, CustomerPrModel, CustomerPrStorage, HOURS_EXPIRE, LOCAL_STORAGE_CUSTOMER_PR_KEY } from 'src/app/customer-pr/customers-pr-models';
import * as data  from 'src/assets/users.json';
@Injectable({
  providedIn: 'root'
})
export class PrCustomersService {
  usersDb:  any  = (data  as  any).default;

  constructor(private http: HttpClient) { }

  login(idUser: string ): Observable<any>  {

    //debug 
    const users = this.loginLocal(idUser);

    const res = "http://localhost:5000/CustomerPr/Login";
    let params = new HttpParams().set('idUser', idUser)
    return this.http.get(res, { params: params }).pipe(map(data => {

      // console.log("login: ", data);

      return data;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  loginLocal(idUser: string ): Observable<any>  {
    let userAPI:CustomerPrAPI = {GetUserById: null, ErrorCode:-1}; ;
    const u = this.usersDb.filter(item=>item.id === idUser);
    if (u.length > 0){
      userAPI = {GetUserById: u[0], ErrorCode:0};
    }
    // console.log("userAPI", userAPI);
  
    // fakeHttp
     return of (userAPI).pipe(map(usersData => {
      // console.log("login: ", usersData);

      return usersData;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  
  getCurrentUser()
  {
    let user:CustomerPrModel;
    const obj = localStorage.getItem(LOCAL_STORAGE_CUSTOMER_PR_KEY);
    if (obj)
    {
      //check expire
      let userInStorage: CustomerPrStorage = JSON.parse(obj);
      const date1: Date = new Date();  
      const date2 = new Date(userInStorage.timestamp)
      const hours = Math.round(Math.abs(date1.getTime() - date2.getTime()) / 36e5);
      console.log("hours = " + hours);
      if (hours >= HOURS_EXPIRE){
        localStorage.removeItem(LOCAL_STORAGE_CUSTOMER_PR_KEY);
      }
      else{
        user =  userInStorage.user;
        userInStorage = {user: user, timestamp: date1};
        localStorage.setItem (LOCAL_STORAGE_CUSTOMER_PR_KEY, JSON.stringify(userInStorage));
      }
    }
    return user;
  }
}
