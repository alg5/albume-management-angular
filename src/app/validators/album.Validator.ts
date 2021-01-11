import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms'
 
import { Observable, of, timer  } from 'rxjs';
import { AlbumService } from '../core/services/album.service';
import { catchError, debounceTime, map } from "rxjs/operators";
import { AlbumModel } from '../classes/AlbumModels';
//import 'rxjs/add/operator/map'

export function validateAlbumCaptionNotTaken(albumService: AlbumService, idUser:number, albumDetails? :AlbumModel): AsyncValidatorFn {

    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      console.log("validateAlbumCaptionNotTaken:1", control.value, control.touched,  control.dirty , albumDetails); 
        if(!control.dirty ){
            return of(null);
        }
        if (control.value === null || control.value.length === 0) {
          return of(null);
        }
        else if (albumDetails && albumDetails.Caption === control.value) {
          return of(null);
        }

        let debTime = 500; //milliseconds
        return albumService.validateAlbumCaptionNotTaken(idUser, control.value).pipe(
          debounceTime(debTime),
          map(
            data => {
                console.log("validateAlbumCaptionNotTaken:12355", data);
                if (data["ErrorCode"] == 0)
                    return  data["ValidateAlbumCaptionNotTaken"] ?   null :  {"albumCaptionExist": true};
                else
                    return {"unexpectedError": true};
            },
            catchError(() => of(null))
          )); 
   
        
      return null;
      
    }
   
  }

  export function noWhitespaceValidator1(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return !isWhitespace ? null : { 'whitespace': true };
    };
  }  
  export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return !isWhitespace ? null : { 'whitespace': true };
 
}