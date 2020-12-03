import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuritiesComponent } from '../components/securities/securities.component';
import { LiveSearchComponent } from '../components/live-search/live-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {  MatDatepickerModule,  } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { OnlyHebrewDirective } from '../directives/only-hebrew.directive';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MenuCornerComponent } from '../components/menu-corner/menu-corner.component';
import { PaperDetailsComponent } from '../components/paper-details/paper-details.component';
import { ListCubePaperDetailsComponent } from '../components/list-cube-paper-details/list-cube-paper-details.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { AlbumListComponent } from '../components/album-list/album-list.component';
import { AlbumActionsComponent } from '../components/album-actions/album-actions.component';
// import { MatFileUploadModule } from 'mat-file-upload/lib/mat-file-upload.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { OnlyNumericIntegerDirective } from '../directives/only-numeric-integer.directive';
import { FieldErrorDisplayComponent } from '../components/field-error-display/field-error-display.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list'

@NgModule({
  declarations: [ SecuritiesComponent, LiveSearchComponent, MenuCornerComponent, OnlyHebrewDirective
                 , PaperDetailsComponent, ListCubePaperDetailsComponent, LoginPageComponent
                 , AlbumListComponent,AlbumActionsComponent,OnlyNumericIntegerDirective
                 , FieldErrorDisplayComponent
                ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    NgxPaginationModule,
    NgxFileDropModule
    // MatFileUploadModule,
    // MatPaginatorIntl
    

  ],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatToolbarModule,
    // MatPaginatorIntl,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,    
    BrowserModule,
    ReactiveFormsModule,
    OnlyHebrewDirective,
    NgxPaginationModule,
    NgxFileDropModule,
    OnlyNumericIntegerDirective
    // MatFileUploadModule
  ]
})
export class SharedModule { }
