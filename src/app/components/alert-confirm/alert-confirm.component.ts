import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertTypeEnum } from 'src/app/classes/enums';
import { IDialogDataAlert } from 'src/app/classes/ShareModels';

// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertConfirmService } from './alert-confirm.service';

// export interface IDialogDataAlert {
 
//   title: string;
//   message:string;
//   btnOkText: string;
//   btnCancelText: string;
//   type: AlertTypeEnum;
// }

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertConfirmComponent implements OnInit {

  @Input() type: AlertTypeEnum = AlertTypeEnum.Alert;
  @Input() title: string = "confirm";
  @Input() message = "are you sure";
  @Input() btnOkText = "Ok";
  @Input() btnCancelText = "Cancel";

  AlertTypeEnum = AlertTypeEnum;

  constructor(public dialogRef: MatDialogRef<AlertConfirmComponent>
    , @Inject(MAT_DIALOG_DATA) data: IDialogDataAlert 
    // , private dialogService: AlertConfirmService
    // , private activeModal: NgbActiveModal
    ) 
    { 
      console.log("AlertConfirmComponent", data);
      this.title = data.title;
      this.message = data.message;
      this.btnCancelText = data.btnCancelText;
      this.btnOkText = data.btnOkText;
      this.type = data.type;
    }

  ngOnInit(): void {
  }
  cancel(): void {
    this.close(false);
  }
  confirm() {
    this.close(true);
  }

//   save() {
//     console.log("save:") ;
//     this.dialogRef.close("kva");
   
    
// }

close(value) {
    this.dialogRef.close(value);
}
@HostListener("keydown.esc") 
  public onEsc() {
    this.close(false);
  }


  // **********************************
  // public decline() {
  //   this.activeModal.close(false);
  // }

  // public accept() {
  //   this.activeModal.close(true);
  // }

  // public dismiss() {
  //   this.activeModal.dismiss();
  // }

}
