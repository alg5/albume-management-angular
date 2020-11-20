import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { AlbumModel, UserModel } from 'src/app/classes/AlbumModels';
import { LOCAL_STORAGE_KEY } from 'src/app/classes/enums';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  lastTime: string;
  lastDate:string;
  isLogged:boolean;
  username :string;
  albumOwner: UserModel = null;

  translations = {
    // CustomerName : " אורח"
     NoDataMessage:  "לא נמצאו נתונים בתנאי המבוקש"  
    , LastVisit: " כניסה אחרונה"
    // , ErrorMessage: "User not exists"

  }

  albumList: AlbumModel[];

  constructor(private datePipe: DatePipe, private httpService: HttpService, private router: Router) { 
      const obj = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!obj){
        this.router.navigate(['/login']);
      }
      else{
        this.albumOwner = JSON.parse(obj);
      }
   

    console.log("constructor:", obj, this.albumOwner );
  }

  ngOnInit(): void {
    // if (this.httpService.userId == 0){
    //   this.router.navigate(['/login']);
    // }
    // else
    {
      const now = Date();
      this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
      this.lastTime = this.datePipe.transform(now, 'shortTime');
      this.username = this.httpService.username;
      this.isLogged = true;
      this.getDataFromApi();
    }
      
  }

  getDataFromApi(){
    
  
    this.httpService.getAlbums( this.albumOwner.Id)
      .subscribe(
              data => {
                  console.log(" getAlbums data: ", data); 
                  if(!data) {
                    //TODO
                    // this.errMsg = "המשתמש לא נמצא";
                    // this.loading = false;
                  
                    return;
                  }
                  this.fillData(data);
                  // this.dataSource = new MatTableDataSource<PaperModel>(this.paperListFiltered);
               },
              error => {
                //TODO
                  // this.loading = false;
    });

  }

  fillData(data)
  {
    this.albumList =  data['GetAlbums'];
    console.log(" fillData: ", this.albumList); 
  }

}
