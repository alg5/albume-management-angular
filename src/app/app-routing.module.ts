import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SecuritiesComponent } from './components/securities/securities.component';
import { ListCubePaperDetailsComponent } from './components/list-cube-paper-details/list-cube-paper-details.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumActionsComponent } from './components/album-actions/album-actions.component';



const routes: Routes = [
 
  {path: 'login', component: LoginPageComponent},
  // { path: 'register', component: RegisterComponent }
   {path: 'albums', component: AlbumListComponent},
   {path: 'actions', component: AlbumActionsComponent},
 { path: '', pathMatch: 'full', redirectTo: 'login' },
 //  { path: '', redirectTo: 'LoginPageComponent', pathMatch: 'full' }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
