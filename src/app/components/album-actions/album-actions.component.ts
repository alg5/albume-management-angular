import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/classes/AlbumModels';
import { AlbumActions, LOCAL_STORAGE_KEY } from 'src/app/classes/enums';

@Component({
  selector: 'app-album-actions',
  templateUrl: './album-actions.component.html',
  styleUrls: ['./album-actions.component.css']
})
export class AlbumActionsComponent implements OnInit {
  sub: any;
  action:AlbumActions ;
  albumOwner: UserModel = null;

  albumCaption:string;
  albumIssueYear:number;
  albumNameArtist:string;

  rForm: FormGroup;

  translations = {
    // CustomerName : " אורח"
     NoDataMessage:  "לא נמצאו נתונים בתנאי המבוקש"  
    , NewAlbum: " אלבום חדש"
    // , ErrorMessage: "User not exists"
    , albumCaptionAlert: "Please fill albumCaption"
    , albumIssueYearAlert: "Please fill albumalbumIssueYear"
    , albumNameArtistAlert: "Please fill albumNameArtist" 
  }

  constructor(private router: Router
              , private activatedRoute: ActivatedRoute
              , private fb: FormBuilder
              ) {
    const obj = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!obj){
      this.router.navigate(['/login']);
    }
    else{
      this.albumOwner = JSON.parse(obj);
    }
   }
  

  ngOnInit(): void {
    this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.action = +params['action'] || AlbumActions.Add;
        // console.log('Query param action: ', this.action);
        this.rForm = this.fb.group({
          'albumCaption' : [null, Validators.required],
          'albumIssueYear' : [null, Validators.required],
          'albumNameArtist' : [null, Validators.required],     
          
          });
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
