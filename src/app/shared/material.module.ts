import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , MatInputModule
    , MatTableModule
    , MatFormFieldModule
    , MatSelectModule
    , MatButtonModule
    , MatAutocompleteModule
    , MatIconModule
    , MatDatepickerModule
    , MatNativeDateModule
    , MatListModule
    , MatMenuModule
    , MatPaginatorModule
    , MatToolbarModule
    , MatCardModule
    , MatGridListModule
  ],
  exports: [

    MatInputModule
    , MatTableModule
    , MatFormFieldModule
    , MatSelectModule
    , MatButtonModule
    , MatAutocompleteModule
    , MatIconModule
    , MatDatepickerModule
    , MatNativeDateModule
    , MatListModule
    , MatMenuModule
    , MatPaginatorModule
    , MatToolbarModule
    , MatCardModule
    , MatGridListModule

  ]
})
export class MaterialModule { }
