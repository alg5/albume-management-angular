import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuritiesComponent } from '../components/securities/securities.component';
import { LiveSearchComponent } from '../components/live-search/live-search.component';
import { MatTableModule } from '@angular/material/table';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { OnlyHebrewDirective } from '../directives/only-hebrew.directive';

import { NgxPaginationModule } from 'ngx-pagination';
import { MenuCornerComponent } from '../components/menu-corner/menu-corner.component';
import { PaperDetailsComponent } from '../components/paper-details/paper-details.component';
import { ListCubePaperDetailsComponent } from '../components/list-cube-paper-details/list-cube-paper-details.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { AlbumListComponent } from '../components/album-list/album-list.component';
import { AlbumActionsComponent } from '../components/album-actions/album-actions.component';

import { NgxFileDropModule } from 'ngx-file-drop';
import { OnlyNumericIntegerDirective } from '../directives/only-numeric-integer.directive';
import { FieldErrorDisplayComponent } from '../components/field-error-display/field-error-display.component';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [ SecuritiesComponent, LiveSearchComponent, MenuCornerComponent, OnlyHebrewDirective
                 , PaperDetailsComponent, ListCubePaperDetailsComponent, LoginPageComponent
                 , AlbumListComponent,AlbumActionsComponent,OnlyNumericIntegerDirective
                 , FieldErrorDisplayComponent
                ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxFileDropModule
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    OnlyHebrewDirective,
    NgxPaginationModule,
    NgxFileDropModule,
    OnlyNumericIntegerDirective
  ]
})
export class SharedModule { }
