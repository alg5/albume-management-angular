import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AlertConfirmComponent } from './alert-confirm.component';
import { AlertConfirmService } from './alert-confirm.service';


@NgModule({
  declarations: [AlertConfirmComponent],
  imports: [
    CommonModule,
    // MatDialogModule,
    MatButtonModule,
    
  ],
  exports: [AlertConfirmComponent],
  entryComponents: [AlertConfirmComponent],
  providers: [AlertConfirmService]
})
export class AlertConfirmModule { }
