import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { UserModel } from 'src/app/classes/AlbumModels';
import { LOCAL_STORAGE_KEY } from 'src/app/classes/enums';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  lastTime: string;
  lastDate:string;
  username:string;
  password:string;
  errorCode: number = 0;

  statuslogin:any;
  focusin: boolean = true;
  rForm: FormGroup;
  post:any;  
  albumOwner: UserModel = null;
  

  translations = {
    CustomerName : " אורח"
    , NoDataMessage:  "לא נמצאו נתונים בתנאי המבוקש"  
    , LastVisit: " כניסה אחרונה"
    , ErrorMessage: "User not exists"
    , UsernameAlert: "Please fill username"
    , PasswordAlert: "Please fill password"
 
  }
  constructor(private datePipe: DatePipe
              , private httpService: HttpService
              , private router: Router
              , private fb: FormBuilder
              ) {
                 const obj = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (obj){
                  this.albumOwner = JSON.parse(obj);
                  this.router.navigate(['/albums']);
                }

                // console.log("constructor:", obj, this.albumOwner );
 
   }

  ngOnInit(): void {
    console.log("ngOnInit:", localStorage.getItem(LOCAL_STORAGE_KEY));
    const now = Date();
    this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
    this.lastTime = this.datePipe.transform(now, 'shortTime');
    this.rForm = this.fb.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
  }
  sendLogin(){
    console.log(this.username, this.password);
    // const  user:UserModel = {Id: 0, Name: this.username, Password: this.password
    //                           , IssueYearPreferenceFilter:0, IssueYearPreferenceSort: 0
    //                           , NameArtistPreferenceFilter: '', NameArtistPreferenceSort: 0 };
    const  user:UserModel = new UserModel();
    user.Name =  this.username;
    user.Password = this.password;
    this.getLoginFromApi(user);
  }
  getLoginFromApi( user:UserModel){
    
  
    this.httpService.login(user )
      .subscribe(
              data => {
                  console.log(" login data: ", data); 
                  if(!data) {
                    //TODO
                    // this.errMsg = "המשתמש לא נמצא";
                    // this.loading = false;
                  
                    return;
                  }
                  this.errorCode = data['ErrorCode'];
                  if (this.errorCode == 0) 
                  {
                    const user : UserModel = data['Login'];
                    // {Id:data['Login'].Id, Name: data['Login'].Name, Password: "" };
                    localStorage.setItem (LOCAL_STORAGE_KEY, JSON.stringify(user));
                    this.router.navigate(['/albums']);
                  }
                  else{
                    localStorage.setItem (LOCAL_STORAGE_KEY, null);
                  }
               },
              error => {
                //TODO
                  // this.loading = false;
    });

  }
 

}
