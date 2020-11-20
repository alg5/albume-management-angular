import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnlyHebrewDirective } from './classes/only-hebrew.directive';
// import { AlbumListComponent } from './components/album-list/album-list.component';
// import { LoginPageComponent } from './components/login-page/login-page.component';
// import { ListCubePaperDetailsComponent } from './components/list-cube-paper-details/list-cube-paper-details.component';
// import { PaperDetailsComponent } from './components/paper-details/paper-details.component';
// import { MenuCornerComponent } from './components/menu-corner/menu-corner.component';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTableModule} from '@angular/material/table';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    // AlbumListComponent,
    // LoginPageComponent,
    // ListCubePaperDetailsComponent,
    // PaperDetailsComponent,
    // MenuCornerComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
    // BrowserAnimationsModule
     
  ],
  providers: [DatePipe, HttpService],

  bootstrap: [AppComponent]
})
export class AppModule { }
