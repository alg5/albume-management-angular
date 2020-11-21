import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { User } from './user';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SubjectPaperDetails } from '../classes/BursaModels';
import { UserModel } from '../classes/AlbumModels';
// import { Customer } from '../objects/Customer';
//  import { PaperModel } from '../Models/PaperModel';

@Injectable({ providedIn: 'root' })
export class HttpService {

  subjectPaperDetails: Subject<SubjectPaperDetails> =  new Subject<SubjectPaperDetails>();

  constructor(private http: HttpClient) { }

  
  GetPapers(numPage = 1, rows = 5, dateFrom : string, dateTo :string ): Observable<any>  {
    //const strUsers = "assets/users.json";
    const res = "http://localhost:5000/Paper/GetPapers";
    console.log("444:dateFrom", dateFrom);
    let params = new HttpParams().set('page', numPage.toString()).set('rows', rows.toString())
    .set('from', dateFrom).set('to', dateTo);
    return this.http.get(res, { params: params }).pipe(map(data => {
      return data;
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  GetPapersByNameAll( ): Observable<any>  {
    //const strUsers = "assets/users.json";
    const res = "http://localhost:5000/Paper/GetPapersByNameAll";
    return this.http.get(res).pipe(map(data => {
      return data;
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  GetPaperById(paperId :number ): Observable<any>  {
    //const strUsers = "assets/users.json";
    const res = "http://localhost:5000/Paper/GetPaperById";
    let params = new HttpParams().set('id', paperId.toString())
    return this.http.get(res, { params: params }).pipe(map(data => {
       return data;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  SearchPapersByName(paperName :string ): Observable<any>  {
    //const strUsers = "assets/users.json";
    const res = "http://localhost:5000/Paper/SearchPapersByName";
    let params = new HttpParams().set('name', paperName)
    return this.http.get(res, { params: params }).pipe(map(data => {

      // console.log("SearchPapersByName: ", data);

      // return papersData;
      return data;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };

  //TODO remove to LoginService
  userId: number = 0;
  username: string = '';
  localStorageKey: string = '';
  // login(username :string, password:string ): Observable<any>  {
  //   //const strUsers = "assets/users.json";
  //   // const res = "http://localhost:5000/Album/Login";
  //   const res = "http://localhost:5000/User/Login";
  //   let params = new HttpParams().set('username', username).set('password', password)
  //   return this.http.get(res, { params: params }).pipe(map(data => {

  //     console.log("login: ", data);

  //     return data;
      
  //   }),
  //     catchError(err => {
  //       console.log("err: ", err);
  //       return throwError(err);
  //     }))
  // };

  login(user: UserModel ): Observable<any>  {
    const res = "http://localhost:5000/User/Login";
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
  
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');
  
    // headers.append('GET', 'POST', 'OPTIONS');
  
    // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    return this.http.post(res, user).pipe(map(data => {

      // console.log("login: ", data);

      return data;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  getAlbums(id:number ): Observable<any>  {
    //const strUsers = "assets/users.json";
    const res = "http://localhost:5000/Album/GetAlbums";
    let params = new HttpParams().set('id', id.toString())
    return this.http.get(res, { params: params }).pipe(map(data => {

      // console.log("GetAlbums: ", data);

      return data;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  changePreference(user: UserModel ): Observable<any>  {
    const res = "http://localhost:5000/User/ChangePreference";
    return this.http.post(res, user).pipe(map(data => {

      console.log("ChangePreference: ", data);

      return data;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  
}