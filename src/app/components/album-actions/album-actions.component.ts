import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumModel, FileModel, GenresEnum, NameId, UserModel } from 'src/app/classes/AlbumModels';
import { AlbumActions, LOCAL_STORAGE_KEY } from 'src/app/classes/enums';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpService } from 'src/app/services/http.service';

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

  genresArr : NameId[];
  rForm: FormGroup;
  newAlbum: AlbumModel;

  selectedGenres: number = 1;

  myfilename:string;
  public files: NgxFileDropEntry[] = [];
  selectedFile :File;
  formData : FormData;
  


  translations = {
    // CustomerName : " אורח"
     NoDataMessage:  "לא נמצאו נתונים בתנאי המבוקש"  
    , NewAlbum: " אלבום חדש"
    // , ErrorMessage: "User not exists"
    , albumCaptionAlert: "Please fill albumCaption"
    , albumeIssuYearAlert: "Please fill albumalbumIssueYear"
    , albumNameArtistAlert: "Please fill albumNameArtist" 
    , chooseAlbumGenres: "בחר סוגה" 
  }

  constructor(private router: Router
              , private activatedRoute: ActivatedRoute
              , private fb: FormBuilder
              , private httpService: HttpService
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
    this.httpService.SubjectTestValid.subscribe((data)=>{
    this.SaveTest();
      })
    this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.action = +params['action'] || AlbumActions.Add;
        // console.log('Query param action: ', this.action);

        // console.log("date", (new Date()).getFullYear());
        this.rForm = this.fb.group({
        
          // albumCaption: new FormControl(this.newAlbum.Caption, [
          //     Validators.required,
          //   ]),
          albumCaption : [null, Validators.required],
          albumIssueYear : [null, [Validators.required, Validators.min(1900),  Validators.max((new Date()).getFullYear())]],
          albumNameArtist : [null, Validators.required],   
          albumGenres : [1, Validators.required], 
          albumPicture : [''],                    
         
          });
      });
  this.fillGenresArr();
    }
  ngOnDestroy() {
        this.httpService.subjectPaperDetails.unsubscribe();
        this.sub.unsubscribe();
  }
  fillGenresArr(){
    this.genresArr = new Array<NameId>();
    const enumValues = Object.values(GenresEnum); 
    for (let i = 0; i< enumValues.length; i++) {
      let g:NameId = {Id: i+1, Name: enumValues[i]};
      this.genresArr.push(g);
    }
    // console.log("this.genresArr", this.genresArr);
    // console.log("this.enumValues", this.enumValues);
  }
  onGenresChange($event){
    console.log("onGenresChange", $event, this.selectedGenres);
  }
  fileChangeEvent($event){
    console.log("fileChangeEvent", $event.target.files);
    const f = $event.target.files[0];
    // console.log("fileChangeEvent:1", f);
    this.formData = new FormData();
    this.formData.append("qwerty", f);
    console.log("fileChangeEvent:2", this.formData);

  }
  fileBrowseHandler(ev)
  {
    // $event.target.files
    console.log("fileBrowseHandler", ev);
  }

  // #region Upload
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.selectedFile = file;
 
          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);
//  console.log("111", file);
 this.formData = new FormData();         
 this.formData.append('logo', file, droppedFile.relativePath);
 const formData = new FormData()
 formData.append('logo', file, droppedFile.relativePath)

//  console.log("1111",this.formData );
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
        // console.log("222", fileEntry);
        // this.selectedFile = fileEntry;
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }
  // #endregion 
  sendNewAlbum()
  {
    this.newAlbum =  new AlbumModel();
    console.log("sendNewAlbum" , this.rForm.valid) ;
    // console.log("sendNewAlbum:files" , this.files[0]) ;
    // this.newAlbum.Id = 0;
    this.newAlbum.Caption = this.rForm.get('albumCaption').value;
    this.newAlbum.IssueYear =  +this.rForm.get('albumIssueYear').value; 
    this.newAlbum.NameArtist = this.rForm.get('albumNameArtist').value; 
    this.newAlbum.Genres = this.rForm.get('albumGenres').value;
    this.newAlbum.GenresDesc = this.genresArr.filter(g=> g.Id == this.rForm.get('albumGenres').value).map(g1 =>g1.Name)[0];
    this.newAlbum.Owner = this.albumOwner;
    delete  this.newAlbum.Id;
   
   
    // console.log(this.files[0]);
    // console.log(this.files[0].fileEntry);
    // console.log(this.files[0].relativePath);
    // console.log(this.files[0]);

    const formData = new FormData();
    const f = this.files[0].fileEntry;
    const relativePath = this.files[0].relativePath;
    const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;
    fileEntry.file((file: File) => {
      formData.append('uploadedFile', file, "anna2.jpg");
    });
    const pic:FileModel = {Id:1, Name: relativePath, Path: relativePath};
    this.newAlbum.Picture = pic;

    if( this.rForm.valid || true)
    {
      this.httpService.addAlbum( this.newAlbum,  formData)
      //  this.httpService.uploadAlbumImage( formData)
      // this.httpService.addAlbumMergePipe(this.newAlbum,  formData)      
      .subscribe(
              data => {
                
                  if(!data) {
                    //TODO
                    return;
                  }
                  const albumCreated:AlbumModel = data["addAlbum"];
                  console.log("albumCreated", data, albumCreated);

                  // this.fillData(data);
               },
              error => {
                //TODO
                  // this.loading = false;
                  console.log("444", error);
    });
    }

    console.log(this.newAlbum) ;
  }
 
  validateAllFormFields(formGroup: FormGroup) {         //{1}
  Object.keys(formGroup.controls).forEach(field => {  //{2}
    const control = formGroup.get(field);             //{3}
    if (control instanceof FormControl) {             //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        //{5}
      this.validateAllFormFields(control);            //{6}
    }
  });
}
isFieldValid(field: string) {
  return !this.rForm.get(field).valid && this.rForm.get(field).touched;
}
  SaveTest(){
    const a = this.isFieldValid("albumCaption");
    const b = this.isFieldValid("albumIssueYear");
    this.validateAllFormFields(this.rForm);
    const c = this.isFieldValid("albumCaption");
    const d = this.isFieldValid("albumIssueYear");
    console.log("SaveTest", a,b,c,d);
  }

}
