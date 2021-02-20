import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { DatePipe } from '@angular/common';
import { HttpService } from './core/services/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor, } from './interceptors/auth.interceptor';
import { httpInterceptorProviders } from "./interceptors";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertConfirmComponent } from './components/alert-confirm/alert-confirm.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MaterialModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule
    // BrowserAnimationsModule
     
  ],
  exports: [],
  providers: [DatePipe, 
              HttpService,
              httpInterceptorProviders,
              {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
            ],

  bootstrap: [AppComponent],
  // entryComponents: [AlertConfirmComponent]
})
export class AppModule { }
