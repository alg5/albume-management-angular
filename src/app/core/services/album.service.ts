import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AlbumModel, UserModel } from 'src/app/classes/AlbumModels';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  
  SubjectAlbumValid: Subject<any> =  new Subject<any>();
  SubjectExportAlbumToExcel: Subject<any> =  new Subject<any>();
  constructor(private http: HttpClient) { }
  
  getAlbums(id:number ): Observable<any>  {
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

  addAlbum(album: AlbumModel, f:FormData, albumOwner:UserModel): Observable<any>  {
    const urlUpload = "http://localhost:5000/Album/UploadAlbumImage";
    const urlAddAlbum = "http://localhost:5000/Album/AddAlbum";
    let params = new HttpParams().set('login', albumOwner.Login);

    return this.http.post(urlUpload, f, { params: params }).pipe(map(data => {
      const pic = data['UploadAlbumImage'];
      album.Picture = pic;
      // console.log("addAlbum 1 step: ", data, pic);
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
  getAlbumsDetails(idAlbum:number ): Observable<any>  {
      const res = environment.apiUrl + "Album/GetAlbumDetails";  
      let params = new HttpParams().set('idAlbum', idAlbum.toString())
      return this.http.get(res, { params: params }).pipe(map(data => {
        // console.log("GetAlbums: ", data);
        return data;
      }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };

  updateAlbum(album: AlbumModel, f:FormData): Observable<any>  {
    const urlUpload = environment.apiUrl + "Album/UploadAlbumImage";
    const urlUpdateAlbum = environment.apiUrl + "Album/UpdateAlbum";
    
   
    if (!f)
    {
      return this.http.post(urlUpdateAlbum, album).pipe(map(data => {
        // console.log("GetAlbums: ", data);
        return data;
      }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
    }
    else
    {
      let params = new HttpParams().set('login', album.Owner.Name);

      return this.http.post(urlUpload, f, { params: params }).pipe(map(data => {

      // return this.http.post(urlUpload, f).pipe(map(data => {
        const pic = data['UploadAlbumImage'];
        album.Picture = pic;
        // console.log("addAlbum 1 step: ", data, pic);
        // return album;
      }),
      mergeMap(data=> this.http.post(urlUpdateAlbum, album).pipe(map(data => {
        console.log("addAlbum 2 step: ", data);
        return data;
      }),
        catchError(err => {
          console.log("err9876: ", err);
          return throwError(err);
        })
      )));
    };
  }
  
  deleteAlbum(idAlbum:number ): Observable<any>  {
    const res = environment.apiUrl + "Album/DeleteAlbum";  
    let params = new HttpParams().set('idAlbum', idAlbum.toString())
    return this.http.get(res, { params: params }).pipe(map(data => {
      // console.log("GetAlbums: ", data);
      return data;
    }),
    catchError(err => {
      console.log("err: ", err);
      return throwError(err);
    }))
  };

  //  #region Async Validations

   //************************* */
 
  validateAlbumCaptionNotTaken(idUser:number, caption:string): Observable<any> {
 
    const url = environment.apiUrl + "Album/AlbumExportToExcel";
    let params = new HttpParams().set('idUser', idUser.toString()).set('caption', caption);
    return this.http.get(url, { params: params });
} 	 



   //#endregionAsync Validations

    albumExportToExcel(albumList: AlbumModel[] ): Observable<any>  {
    const res = "http://localhost:5000/Album/AlbumExportToExcel";
    return this.http.post(res,albumList).pipe(map(data => {
      console.log("albumExportToExcel: ", data);
      return data;
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
}
