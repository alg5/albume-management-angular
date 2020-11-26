import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { User } from './user';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { SubjectPaperDetails } from '../classes/BursaModels';
import { AlbumModel, UserModel } from '../classes/AlbumModels';
// import { Customer } from '../objects/Customer';
//  import { PaperModel } from '../Models/PaperModel';

@Injectable({ providedIn: 'root' })
export class HttpService {

  subjectPaperDetails: Subject<SubjectPaperDetails> =  new Subject<SubjectPaperDetails>();
  SubjectTestValid: Subject<any> =  new Subject<any>();

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
  addAlbumBk(album: AlbumModel, f:FormData): Observable<any>  {


    const urlUpload = "http://localhost:5000/Album/UploadAlbumImage";
    const urlAddAlbum = "http://localhost:5000/Album/AddAlbum";
    let params = new HttpParams().set('login', "tom");
    return this.http.post(urlUpload, f, { params: params },).pipe(
      switchMap(data=> this.http.post(urlAddAlbum, album).pipe(map(data1 =>{
        console.log("1234", data);
        console.log("12345", data1);
        return data1;
      }))
      )
      ,
      catchError(err => {
        console.log("err9876: ", err);
        return throwError(err);
      })
    );
  };


  //***************************************************** */
  addAlbum1(album: AlbumModel, f:FormData): Observable<any>  {
    // enctype="multipart/form-data"
    // { headers: headers, responseType: 'blob' }
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //         'Content-Type':  'application/json',
  //        'enctype' :"multipart/form-data",
         

  //       }), responseType: 'blob'
  // };

  const headers = new HttpHeaders({
    'Content-Type' :"multipart/form-data;",
    'enctype' :"multipart/form-data; "
  })
    // const res = "http://localhost:5000/Album/AddAlbum";
    const res = "http://localhost:5000/Album/UploadAlbumImage";
    // return this.http.post(res, [album, f]).pipe(map(data => {
      // , { headers: headers, responseType: 'blob' }
      let params = new HttpParams().set('login', "tom");
      return this.http.post(res, f, { params: params }).pipe(map(data => {

      console.log("addAlbum: ", data);

      return data;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  addAlbum(album: AlbumModel, f:FormData): Observable<any>  {


    const urlUpload = "http://localhost:5000/Album/UploadAlbumImage";
    const urlAddAlbum = "http://localhost:5000/Album/AddAlbum";
    let params = new HttpParams().set('login', "tom");
    return this.http.post(urlUpload, f, { params: params }).pipe(map(data => {

      const pic = data['UploadAlbumImage'];
      album.Picture = pic;
      console.log("addAlbum 1 step: ", data, pic);

      // return album;
      
    }),
    mergeMap(data=> this.http.post(urlAddAlbum, album).pipe(map(data => {
      console.log("addAlbum 2 step: ", data);
      return data;
      
    }),
      catchError(err => {
        console.log("err9876: ", err);
        return throwError(err);
      })
    )));
  };

  //*************************************** */
  uploadAlbumImage( f:FormData): Observable<any>  {

    const res = "http://localhost:5000/Album/UploadAlbumImage";
      let params = new HttpParams().set('login', "tom");
      return this.http.post(res, f, { params: params }).pipe(map(data => {

      console.log("uploadAlbumImage: ", data);

      return data;
      
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };

  
}