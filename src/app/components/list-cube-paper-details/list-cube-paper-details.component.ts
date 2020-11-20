import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PaperNameModel, SubjectPaperDetails } from 'src/app/classes/BursaModels';
import { ShapePaperDetals } from 'src/app/classes/enums';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-list-cube-paper-details',
  templateUrl: './list-cube-paper-details.component.html',
  styleUrls: ['./list-cube-paper-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListCubePaperDetailsComponent implements OnInit {

  paperNameList: PaperNameModel[];
  expandedElement: PaperNameModel | null;

  // eventsSubject: Subject<number> = new Subject<number>();
  ShapePaperDetals = ShapePaperDetals;

  constructor(private httpService: HttpService) {
    // this.httpService.subjectPaperDetails.next(0);
   }
  
  ngOnInit(): void {
    // this.eventsSubject.next(0);
    this.httpService.GetPapersByNameAll()
    .subscribe(
            data => {
                // console.log(" GetPapersByNameAll data: ", data); 
                if(!data) {
                  //TODO

                  return;
                }
                this.paperNameList = data['PapersByNameList'];
                console.log(" GetPapersByNameAll data: ", this.paperNameList); 

             },
            error => {
              //TODO
                // this.loading = false;
  });
  }
  showDetails(id:number, shape: ShapePaperDetals){
    console.log("showDetails", id, this.expandedElement);
    this.httpService.subjectPaperDetails.next(new SubjectPaperDetails(id, shape));

  }

}
