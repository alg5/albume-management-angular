import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { AlbumModel, NameId, NameIdString, UserModel } from 'src/app/classes/AlbumModels';
import { LOCAL_STORAGE_KEY, SortEnum, TOTAL, TOTAL_TEXT, WITHOUT_SORTING } from 'src/app/classes/enums';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  lastTime: string;
  lastDate:string;
  username :string;
  albumOwner: UserModel = null;

  selectedYear: number = TOTAL;
  selectedYearSort: number = TOTAL;
  
  selectedArtist: string = TOTAL_TEXT;
  selectedArtistSort: number = TOTAL;
  
  translations = {
     NoDataMessage:  "לא נמצאו נתונים בתנאי המבוקש"  
    , LastVisit: " כניסה אחרונה"
    , IssueYear: "שנת הוצאה"
    , ArtistName: "שם אומן"
    , Genres: "סוגה"
    , ChooseIssueYear: "בחר שנת הוצאה"
    , ChooseIssueYearSort: "בחר מיון שנת הוצאה"
    , ChooseArtist: "בחר שם אומן"
    , ChooseArtistSort: "בחר מיון שם אומן"    

  }

  albumList: AlbumModel[];
  albumListFiltered: AlbumModel[];
  yearList: NameId[];
  yearSorting: NameId[];
  artistList: NameIdString[];
  artistSorting: NameId[];

  constructor(private datePipe: DatePipe, private httpService: HttpService, private router: Router) { 
      const obj = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!obj){
        this.router.navigate(['/login']);
      }
      else{
        this.albumOwner = JSON.parse(obj);
      }
   
  }

  ngOnInit(): void {
 
      const now = Date();
      this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
      this.lastTime = this.datePipe.transform(now, 'shortTime');
      this.username = this.albumOwner.Name;

      //init selections
      this.selectedYear = this.albumOwner.IssueYearPreferenceFilter;
      this.selectedYearSort = this.albumOwner.IssueYearPreferenceSort;
      this.selectedArtist = !this.albumOwner.IssueYearPreferenceFilter ? TOTAL_TEXT : this.albumOwner.NameArtistPreferenceFilter;
      this.selectedArtistSort = this.albumOwner.NameArtistPreferenceSort;
      this.getDataFromApi();
 
      
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
    this.fillYears();
    this.fillYearsSorting();
    this.fillArtists();
    this.fillArtistSorting();
    this.filteredData();
    this.sortedData();
  }

  fillYears(){
    this.yearList = new Array<NameId>();
    const arr = this.albumList.map(item=>item.IssueYear).sort();
    const arrSet  = new Set(arr); 
    let year: NameId = {Id:TOTAL, Name:TOTAL_TEXT};
    this.yearList.push(year);
    arrSet.forEach((item, index) => {
      // console.log(item); // 9, 2, 5
      console.log(index); // 0, 1, 2
      let year: NameId = {Id:index, Name:item.toString()};
      this.yearList.push(year);

  });
    console.log("this.yearList=", this.yearList);
  }
  fillYearsSorting(){
    this.yearSorting = new Array<NameId>();
    let item: NameId = {Id:0, Name:WITHOUT_SORTING};
    this.yearSorting.push(item);
    item = {Id:1, Name:SortEnum.Asc};
    this.yearSorting.push(item);
    item = {Id:2, Name:SortEnum.Desc};
    this.yearSorting.push(item);
    
  }
  fillArtists(){
    this.artistList = new Array<NameIdString>();
    const arr = this.albumList.map(item=>item.NameArtist).sort();
    const arrSet  = new Set(arr); 
    let artist: NameIdString = {Id:TOTAL_TEXT, Name:TOTAL_TEXT};
    this.artistList.push(artist);
    // let index = 1;
    arrSet.forEach((item) => {
      let artist: NameIdString = {Id:item, Name:item};
      this.artistList.push(artist);
      }); 
    console.log("this.artistList=", this.artistList);
  }
  fillArtistSorting(){
    this.artistSorting = new Array<NameId>();
    let item: NameId = {Id:0, Name:WITHOUT_SORTING};
    this.artistSorting.push(item);
    item = {Id:1, Name:SortEnum.Asc};
    this.artistSorting.push(item);
    item = {Id:2, Name:SortEnum.Desc};
    this.artistSorting.push(item);
    
  }
  filteredData()
  {
    this.albumListFiltered = this.albumList;
    if (this.selectedYear > 0){
      this.albumListFiltered = this.albumListFiltered.filter(a=> a.IssueYear === this.selectedYear);
    }
    if (this.albumListFiltered.length === 0)
      return;
    if (this.selectedArtist != TOTAL_TEXT){
      this.albumListFiltered = this.albumListFiltered.filter(a=> a.NameArtist === this.selectedArtist);
    }
  }
  sortedData()
  {
    if(this.selectedYearSort == 0 && this.selectedArtistSort == 0)
      return;
    if (this.selectedYearSort > 0 && this.selectedArtistSort == 0 )
      this.albumListFiltered = this.albumListFiltered.sort(this.albumComparator('IssueYear', this.selectedYearSort));
    if (this.selectedArtistSort > 0 && this.selectedYearSort == 0 )
      this.albumListFiltered = this.albumListFiltered.sort(this.albumComparator('NameArtist', this.selectedArtistSort));
    else
      this.albumListFiltered = this.albumListFiltered.sort(this.albumComparatorTwo('IssueYear', 'NameArtist', this.selectedYearSort, this.selectedArtistSort));
  }

  
  onYearChange($event)
  {
    console.log ("onYearChange", $event, $event.value, this.selectedYear);
    this.filteredData();
    this.albumOwner.IssueYearPreferenceFilter = this.selectedYear;
    this.changePreferenceApi();
  }
  onYearSortChange($event)
  {
    console.log ("onYearSortChange", $event, $event.value, this.selectedYearSort);
    this.sortedData();
    this.albumOwner.IssueYearPreferenceSort = this.selectedYearSort;
    this.changePreferenceApi();
  }
  onArtistChange($event)
  {
    console.log ("onArtistChange", $event, $event.value, this.selectedArtist);
    this.filteredData();
    this.albumOwner.NameArtistPreferenceFilter = this.selectedArtist;
    this.changePreferenceApi();

  }
  onArtistSortChange($event)
  {
    console.log ("onArtistSortChange", $event, $event.value, this.selectedArtistSort);
    this.sortedData();
    this.albumOwner.NameArtistPreferenceSort = this.selectedArtistSort;
    this.changePreferenceApi();
  }

  albumComparator(prop, selSort:number) {
    return function(a, b) {
        return selSort == 1 ? a[prop] - b[prop] : b[prop] - a[prop];
    }
  }
  albumComparatorTwo(prop1, prop2, selSort1:number, selSort2) {
    return function(a, b) {
      if (a[prop1] != b[prop1])
        return selSort1 == 1 ? a[prop1] - b[prop1] : b[prop1] - a[prop1];
      else
      return selSort2 == 1 ? a[prop2] - b[prop2] : b[prop2] - a[prop2];
    }
  }
  changePreferenceApi(){
    
  
    this.httpService.changePreference( this.albumOwner)
      .subscribe(
              data => {
                  console.log(" changePreferenceApi data: ", data); 
                  if(!data) {
                    //TODO
                    return;
                  }
                 // this.fillData(data);
                 //update local storage
                 const user : UserModel = data['ChangePreference'];
                 localStorage.setItem (LOCAL_STORAGE_KEY, JSON.stringify(user));
              },
              error => {
                //TODO

    });

  }



   
  

}
