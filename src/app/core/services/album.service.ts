import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AlbumModel, UserModel } from 'src/app/classes/AlbumModels';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

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
      return this.http.post(urlUpload, f).pipe(map(data => {
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

  
}
