import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/core/services/http.service';
import { BursaModel, NameId, PaperModel, PaperNameModel, PaperTypeModel, SubjectPaperDetails } from 'src/app/classes/BursaModels';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ShapePaperDetals, TOTAL, TOTAL_TEXT } from 'src/app/classes/enums';


@Component({
  selector: 'app-securities',
  templateUrl: './securities.component.html',
  styleUrls: ['./securities.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SecuritiesComponent implements OnInit, AfterViewInit  {

  
  lastTime: string;
  lastDate:string;

  ShapePaperDetals = ShapePaperDetals;

  paperDetails: PaperModel;
  paperDetailsError:number = 0;
  mySearch: string;
 
  paperSearches:PaperModel[];
  paperSearchesError:number = 0;
  paperCoosedDetails: PaperModel;
  isExists:number = 0;

  paperList: PaperModel[];
  paperListFiltered: PaperModel[];

    
  bursaList: BursaModel[];

  paperTypeList: PaperTypeModel[];
  paperTypeListFiltered: PaperTypeModel[];
  
  paperNameList: PaperNameModel[];
  amountValueList:NameId[];

  currentPage : number = 1;
  rowsOnPage:number = 5;
  pageSize: number = 5;
  page: number = 1;

  totalPapers:number = 0;
  isPagingInitialized:boolean;
  
  columndefs : any[] = ['PaperName','PaperTypeValue', 'LastDeal', 'LastRate', 'LastRatePercent','Amount'];

  columnNames = {
    PaperName : 'שם נייר'
    , PaperTypeValue: 'סוג נייר'
    , LastDeal: 'עסקה אחרונה'
    , LastRate: 'שער אחרון'
    , LastRatePercent:'שינוי יומי %'
    , Amount: "מס' עסקאות"  
    , DateIssue: "תאריך"  
    , RateBuy: "שאר קניה"
    , RateSell: "שאר מכירה"
  }
  translations = {
    CustomerName : " אורח"
    , NoDataMessage:  "לא נמצאו נתונים בתנאי המבוקש"  
    , AmountGreat100: "מס' עסקאות > 100"
    , AmountGreat1000: "מס' עסקאות > 1000"
    , LastVisit: " כניסה אחרונה"
    , PaperExistsInTable: "הנייר הנל כבר קיים בטבלה"
    , PlaceHolderSearch: "חפש כאן"
  }
   
  dataSource :any; // = new MatTableDataSource<PaperModel>(paperListFiltered);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  expandedElement: PaperModel | null;

  
  dateFrom = new FormControl(new Date());
  dateTo = new FormControl(new Date());

  selectedBursa: number = TOTAL ;
  selectedPaperType: number = TOTAL ;
  selectedPaperName: number = TOTAL ;
  selectedAmount: number = TOTAL ;

  constructor(private datePipe: DatePipe, private httpService: HttpService) {
    const now = Date();
    this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
    this.lastTime = this.datePipe.transform(now, 'shortTime');
   }

  ngOnInit(): void {
    let aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() -3);
    this.dateFrom =new FormControl(aYearFromNow);
    this.getDataFromApi();

  }
  ngAfterViewInit() {
    // this.getDataFromApi();
    // this.dataSource = new MatTableDataSource<PaperModel>(this.paperListFiltered);
    // this.dataSource.paginator = this.paginator;
    // setTimeout(() => this.dataSource = new MatTableDataSource<PaperModel>(this.paperListFiltered));
    // setTimeout(() => this.dataSource.paginator = this.paginator);
    // console.log("paginator",this.paginator?.getNumberOfPages() ) ;

  }
  getDataFromApi(){
    
    const dtFrom = this.dateFrom.value.toISOString().split("T")[0];
    const dtTo = this.dateTo.value.toISOString().split("T")[0];
    
    console.log("333", this.dateFrom.value.toISOString(), dtFrom);
    this.httpService.GetPapers(this.page, this.pageSize, dtFrom, dtTo )
      .subscribe(
              data => {
                  // console.log(" securities data: ", data); 
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
 
  searchPapersByName(paperName: string){
    this.httpService.SearchPapersByName(paperName )
      // .pipe(first())
      .subscribe(
              data => {
                  if(!data) {
                    //TODO
                    // this.errMsg = "המשתמש לא נמצא";
                    // this.loading = false;
                  
                    return;
                  }
                    if (data["ErrorCode"] == -1){
                      // this.paperDetailsError = data["ErrorCode"] ;
                      this.paperSearches = null;
                    }
                    else{
                      this.paperSearches = data["SearchPapersByName"];
                      console.log("this.paperSearches" , this.paperSearches);

                      // this.paperDetailsError = 0;
                    }


                    
               },
              error => {
                //TODO
                  // this.loading = false;
    });
  }
  getChoosedPaper(paperId: number){
    this.httpService.GetPaperById(paperId )
      // .pipe(first())
      .subscribe(
              data => {
                  if(!data) {
                    //TODO
                    // this.errMsg = "המשתמש לא נמצא";
                    // this.loading = false;
                  
                    return;
                  }
                    if (data["ErrorCode"] == -1){
                      // this.paperDetailsError = data["ErrorCode"] ;
                      this.paperCoosedDetails = null;
                    }
                    else{
                      this.paperCoosedDetails = data["GetPaperById"];
                      

                      // this.paperDetailsError = 0;
                    }


                    
               },
              error => {
                //TODO
                  // this.loading = false;
    });
  }
  
  fillData(data)
  {
      this.totalPapers =  data['TotalPapers'];
      this.bursaList =  data['BursaTypeList'];
      

      const bt: BursaModel = new BursaModel();
      bt.Id = TOTAL;
      bt.Name = TOTAL_TEXT;
      this.bursaList.unshift(bt);

      this.paperTypeList = data['PaperTypeList'];
      const pt: PaperTypeModel = new PaperTypeModel();
      pt.Id = TOTAL;
      pt.Name = TOTAL_TEXT;
      this.paperTypeList.unshift(pt);
      this.reFillPaperTypeList();


      this.paperList = data['PapersList'];
      this.fillPaperNameList();

      this.fillAmountValueList();

      this.filteredData();

      // console.log("PapersList: ", this.paperList);
      console.log("totalPapers: ", this.totalPapers, this.dataSource?.paginator?.length);
      // this.paginator.length = this.totalPapers;
      // console.log("BursaTypeList: ", this.bursaList);
      // console.log("paperNameList: ", this.paperNameList);
  }
  reFillPaperTypeList()
  {
    this.paperTypeListFiltered = this.paperTypeList;
    if (this.paperTypeListFiltered && this.selectedBursa > 0){
      this.paperTypeListFiltered = this.paperTypeList.filter(pt=> pt.Bursa?.Id == this.selectedBursa);
    }
    
  }
  fillPaperNameList(){
    this.paperNameList = [];
    let item: PaperNameModel;
    this.paperList.forEach( (p) => {
     item = new PaperNameModel();
      item.Id = p.PaperId;
      item.Name = p.PaperName;
      this.paperNameList.push(item);
    });
    item = new PaperNameModel();
      item.Id = TOTAL;
      item.Name = TOTAL_TEXT;
      this.paperNameList.push(item);
  }
  fillAmountValueList(){
    this.amountValueList = [];
    let item: NameId = new NameId();
      item.Id = TOTAL;
      item.Name = TOTAL_TEXT;
      this.amountValueList.push(item);
      item = new NameId();
      item.Id = 1;
      item.Name = this.translations.AmountGreat100;
      this.amountValueList.push(item);
      item = new NameId();
      item.Id = 2;
      item.Name = this.translations.AmountGreat1000;
      this.amountValueList.push(item);

  }
  onPageChanged($event){
    
    this.page = $event;
    this.currentPage = $event.pageIndex + 1;
    console.log ("onPageChanged",  $event, this.page);
    this.getDataFromApi();
  }
  onSearch($event)
  {
    // console.log ("onSearch", this.mySearch);
    this.isExists = 0;
    if(this.mySearch && this.mySearch.length > 0){
      this.searchPapersByName(this.mySearch);
    }
    else{
      this.paperSearches = null;
    }
   
  }
  choosed(paperId:number, paperName: string){
    console.log ("choosed", paperId, paperName);
    this.paperSearches = null;
    this.mySearch = '';
    //check if this paper exists 
    const arr = this.paperList.filter(p=>paperId == paperId);
    if(arr.length > 0){
      this.isExists = 1;
    }
    else
    {
      this.isExists = 0;
      this.getChoosedPaper(paperId);
    }


    
  }

  onExpanded(id:number, shape: ShapePaperDetals)
  {
    // console.log ("onExpanded", id, this.expandedElement);
    if(this.expandedElement){
      this.httpService.subjectPaperDetails.next(new SubjectPaperDetails(id, shape));
    }
    else{
      this.paperDetails = null;
      this.paperDetailsError = 0;
    }
  }
  onDateChanged($event)
  {
    console.log ("onDateChanged", $event, $event.value, this.dateFrom.value, this.dateTo.value);
    this.getDataFromApi();
  }
  onBursaChange($event)
  {
    // console.log ("onBursaChange", $event, $event.value, this.selectedBursa);
    this.reFillPaperTypeList();
    this.filteredData();
  }
  onPaperTypeChange($event)
  {
    // console.log ("onPaperTypeChange", $event, $event.value, this.selectedPaperType);
    this.filteredData();
  }
  onPaperNameChange($event)
  {
    // console.log ("onPaperNameChange", $event, $event.value, this.selectedPaperName);
    this.filteredData();
  }
  onAmountChange($event)
  {
    // console.log ("onAmountChange", $event, $event.value, this.selectedAmount);
    this.filteredData();
  }
  
  filteredData()
  {
    this.paperListFiltered = this.paperList;
    if (this.selectedBursa > 0){
      this.paperListFiltered = this.paperListFiltered.filter(p=> p.PaperTypeValue.Bursa.Id === this.selectedBursa);
    }
    // if (this.paperListFiltered.length === 0)
    //   return;
    if (this.paperListFiltered.length > 0 && this.selectedPaperType > 0){
      this.paperListFiltered = this.paperListFiltered.filter(p=> p.PaperTypeValue.Id === this.selectedPaperType);
    }
    // if (this.paperListFiltered.length === 0)
    //   return; 
    if (this.paperListFiltered.length > 0 && this.selectedPaperName > 0){
      this.paperListFiltered = this.paperListFiltered.filter(p=> p.PaperId === this.selectedPaperName);
    }
    // if (this.paperListFiltered.length === 0)
    //   return;  
    if (this.paperListFiltered.length > 0 && this.selectedAmount > 0){
      let minAmount = 0;
      switch(this.selectedAmount)
      {
        case 1:
          minAmount = 100;
          break;
        case 2:
          minAmount = 1000;
          break;
      }
      this.paperListFiltered = this.paperListFiltered.filter(p=> p.Amount > minAmount);
      
    } 
    this.dataSource = new MatTableDataSource<PaperModel>(this.paperListFiltered);   
    if(!this.isPagingInitialized || true)  {
      // this.dataSource = new MatTableDataSource<PaperModel>(this.paperListFiltered);
    //  console.log("paginator",this.paginator?.getNumberOfPages(), this.paginator?.page, this.paginator?.pageIndex, this.paginator?.length) ;
      this.dataSource.paginator = this.paginator;
      // this.paginator. = 
      this.isPagingInitialized = true;
    }    
    console.log("paginator",this.paginator?.getNumberOfPages(), this.paginator?.page, this.paginator?.pageIndex, this.paginator?.length) ;

    
      // console.log("222", this.dataSource);      

  }

  addPaperToTable(paper : PaperModel){

  }
  

}
