import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertConfirmComponent } from './alert-confirm.component';
import { map, take } from 'rxjs/operators';
import { IDialogDataAlert } from 'src/app/classes/ShareModels';
import { AlertTypeEnum } from 'src/app/classes/enums';
@Injectable({
  providedIn: 'root'
})
export class AlertConfirmService {
 
  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<AlertConfirmComponent>;

  public open(options:IDialogDataAlert) {
    console.log("AlertConfirmService:open",options );
    this.dialogRef = this.dialog.open(AlertConfirmComponent, {    
      data: options
 });  
}
 
   public confirmed(): Observable<any> {
    console.log("AlertConfirmService:confirmed" );
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
  ));
  }
  
}
