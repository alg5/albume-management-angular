import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumModel, FileModel, GenresEnum, NameId, UserModel } from 'src/app/classes/AlbumModels';
import { AlbumActions, LOCAL_STORAGE_KEY } from 'src/app/classes/enums';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpService } from 'src/app/core/services/http.service';
import { AlbumService } from 'src/app/core/services/album.service';

@Component({
  selector: 'app-album-actions',
  templateUrl: './album-actions.component.html',
  styleUrls: ['./album-actions.component.css']
})
export class AlbumActionsComponent implements OnInit {

  AlbumActions = AlbumActions;

  sub: any;
  action:AlbumActions ;
  albumId:number;
  albumOwner: UserModel = null;

  albumCaption:string;
  albumIssueYear:number;
  albumNameArtist:string;

  genresArr : NameId[];
  rForm: FormGroup;
  newAlbum: AlbumModel;
  albumDetails: AlbumModel;

  selectedGenres: number = 1;


  public files: NgxFileDropEntry[] = [];
  selectedFile :File;
  selFileName:string;
  selFileType:string;
  formData : FormData;

  minYear =  1900;
  maxYear = (new Date()).getFullYear();
  submitted: boolean;

  headerTxt:string;
  header2Txt:string;



  translations = {
    // CustomerName : " אורח"
     NoDataMessage:  "לא נמצאו נתונים בתנאי המבוקש"  
    , NewAlbum: " אלבום חדש"
    , AlbumCaption: "כותרת"
    , AlbumIssueYear: `שנת הוצאה `
    // , AlbumIssueYear: `שנת הוצאה בתווח ${this.minYear} - ${this.maxYear}`
    , AlbumNameArtist: "שם אומן"
    , ChooseAlbumGenres: "בחר סוגה"
    , ChooseFile: "בחר קובץ" 
    , UploadPicture: "העלה תמונה"
    , PictureName: "שם תמונה"
    , PictureType: "סוג תמונה"
    , Genres: "סוגה"
    , Send: "שלח"
    , DragAndDrop: "גרור ושחרר לכאן"
    // , ErrorMessage: "User not exists"
    , AlbumCaptionAlert: "*נא הזן כותרת"
    , AlbumeIssuYearAlert1: "*נא הזן שנת הוצאה"
    , AlbumeIssuYearAlert2: `נא הזן שנת הוצאה בתווח ${this.minYear} - ${this.maxYear}`
    , AlbumNameArtistAlert: "*נא הזן שם אומן" 
    , ChooseAlbumGenrestAlert: "*נא בחר סוגה " 
    , ChooseFiletAlert: "*נא בחר סוגה "
    , PictureNameAlert: "*נא הזן שם תמונה"  
    , HeaderAddAlbum: "הוספת אלבום" 
    , HeaderEditAlbum: "עריכת אלבום" 
    , HeaderDeleteAlbum: "מחיקת אלבום"  
    , HeaderNewAlbum: "אלבום חדש"  
    , AlbumDetails: "פרטי אלבום"    
  }

  constructor(private router: Router
              , private activatedRoute: ActivatedRoute
              , private fb: FormBuilder
              , private httpService: HttpService
              , private albumService: AlbumService
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
      this.submitted = true;
      this.SaveTest();
      })
    this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.action = +params['action'] || AlbumActions.Add;
        this.albumId = +params['id'] || 0;
        this.setDataByAction();

        // console.log('Query param action: ', this.action);

        // console.log("date", (new Date()).getFullYear());
        this.rForm = this.fb.group({
          albumCaption : [this.albumDetails?.Caption || null, Validators.required],
          albumIssueYear : [null, [Validators.required, Validators.min(this.minYear),  Validators.max(this.maxYear)]],
          albumNameArtist : ["", Validators.required],   
          albumGenres : [1, Validators.required], 
          albumPicture : ['', Validators.required],                    
          pictureName : [null, Validators.required], 
          // albumCaption2 : [null, Validators.required],          
          });
      });
      this.fillGenresArr();
      if (this.action != AlbumActions.Add){
        this.getAlbumDetailsFromApi();
      }
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
  
  // #region Upload
 
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.selectedFile = file;
          this.selFileName = droppedFile.relativePath.split('.').slice(0, -1).join('.')
          this.selFileType = droppedFile.relativePath.split('.').pop();
          this.rForm.patchValue({
            pictureName: this.selFileName,
            albumPicture: droppedFile.relativePath
          });
          // console.log(file,  this.selFileName,  this.selFileType);
 
          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);
//  console.log("111", file);
//  this.formData = new FormData();         
//  this.formData.append('logo', file, droppedFile.relativePath);
 const formData = new FormData()
//  formData.append('logo', file, droppedFile.relativePath)

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
    this.submitted = true;
    this.validateAllFormFields(this.rForm);
    console.log(" this.rForm.valid" ,   this.rForm.valid) ;
    console.log("albumCaption" ,  this.isFieldValid("albumCaption")) ;
    console.log("albumIssueYear" ,  this.isFieldValid("albumIssueYear")) ;
    console.log("albumNameArtist" ,  this.isFieldValid("albumNameArtist")) ;
    console.log("albumGenres" ,  this.isFieldValid("albumGenres")) ;
    console.log("albumPicture" ,  this.isFieldValid("albumPicture")) ;
    console.log("pictureName" ,  this.isFieldValid("pictureName")) ;
    if( this.rForm.valid)
    {
    this.newAlbum =  new AlbumModel();
    
    // console.log("sendNewAlbum:files" , this.files[0]) ;
    // this.newAlbum.Id = 0;
    this.newAlbum.Caption = this.rForm.get('albumCaption').value;
    this.newAlbum.IssueYear =  +this.rForm.get('albumIssueYear').value; 
    this.newAlbum.NameArtist = this.rForm.get('albumNameArtist').value; 
    this.newAlbum.Genres = this.rForm.get('albumGenres').value;
    this.newAlbum.GenresDesc = this.genresArr.filter(g=> g.Id == this.rForm.get('albumGenres').value).map(g1 =>g1.Name)[0];
    this.newAlbum.Owner = this.albumOwner;
    delete  this.newAlbum.Id;
   
    const formData = new FormData();
    const f = this.files[0].fileEntry;
    const relativePath = this.files[0].relativePath;
    const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;
    fileEntry.file((file: File) => {
      formData.append('uploadedFile', file, `${this.rForm.get('pictureName').value}.${this.selFileType}`);
    });
    const pic:FileModel = {Id:0, Name: relativePath, Path: relativePath};
    this.newAlbum.Picture = pic;

   console.log("new name =", `${this.rForm.get('pictureName').value}.${this.selFileType}`) ;
      this.albumService.addAlbum( this.newAlbum,  formData, this.albumOwner)
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
  return !this.rForm?.get(field)?.valid && this.rForm?.get(field)?.touched;
}
  SaveTest(){
    const a = this.isFieldValid("albumCaption");
    const b = this.isFieldValid("albumIssueYear");
    this.validateAllFormFields(this.rForm);
    const c = this.isFieldValid("albumCaption");
    const d = this.isFieldValid("albumIssueYear");
    console.log("SaveTest", a,b,c,d);

    const a1 = this.rForm.controls['albumIssueYear'].errors;
    console.log("SaveTest:1", a1, this.isFieldValid("albumIssueYear"));
  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  getFileName(fPath:string): string{
    return fPath.split('.').slice(0, -1).join('.')
  }
  getFileType(fPath:string): string{
    return fPath.split('.').pop();
  }
  setDataByAction(){
    switch (this.action)
    {
      case AlbumActions.Add:
        this.headerTxt = this.translations.HeaderAddAlbum;
        this.header2Txt = this.translations.HeaderNewAlbum;
        break;
      case AlbumActions.Edit:
        this.headerTxt = this.translations.HeaderEditAlbum;
        this.header2Txt = this.translations.AlbumDetails;
        break;
      case AlbumActions.Delete:
        this.headerTxt = this.translations.HeaderDeleteAlbum;
        this.header2Txt = this.translations.AlbumDetails;
        break;

    }
    this.headerTxt
  }
  getAlbumDetailsFromApi(){
    
  
    this.albumService.getAlbumsDetails( this.albumId)
      .subscribe(
              data => {
                  if(!data) {
                    //TODO
                    return;
                  }
                  
                  console.log("getAlbumsDetails", data);
                  this.fillData(data);
               },
              error => {
                //TODO
                  // this.loading = false;
    });

  }
  fillData(data){
    this.albumDetails = data["GetAlbumDetails"];
    this.rForm.patchValue({
      albumCaption: this.albumDetails.Caption,
      albumIssueYear: this.albumDetails.IssueYear,
      albumNameArtist: this.albumDetails.NameArtist,  
      albumGenres: this.albumDetails.Genres,      
      pictureName: this.albumDetails.Picture.Name,
      albumPicture: this.albumDetails.Picture.Path
    });
  }

  updateAlbum(){
    this.albumService.updateAlbum( this.albumDetails, null)
    .subscribe(
            data => {
                if(!data) {
                  //TODO
                  return;
                }
                
                console.log("updateAlbum", data);
                // this.fillData(data);
             },
            error => {
              //TODO
                // this.loading = false;
  });
  }

  deleteAlbum(){
    if(confirm("Are you sure to delete album")) {
      console.log("Implement delete functionality here");
      this.albumService.deleteAlbum( this.albumDetails.Id)
      .subscribe(
              data => {
                  if(!data) {
                    //TODO
                    return;
                  }
                  
                  console.log("deleteAlbum", data);
                  //this.fillData(data);
               },
              error => {
                //TODO
                  // this.loading = false;
    });
    }
  }


}

