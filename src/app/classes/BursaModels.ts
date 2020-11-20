import { ShapePaperDetals } from './enums';

export interface INameId{
    Id: number;
    Name:string;
  }
  export class NameId implements INameId{
    Id: number;
    Name:string;
  }
  export class BursaModel implements INameId{
    Id: number;
    Name:string;
}

  export class PaperTypeModel {
    Id: number;
    Name: string;
    Bursa: BursaModel;
}
export class PaperNameModel implements INameId{
    Id: number;
    Name:string;
  }
  
  export class SubjectPaperDetails{
    PaperId: number;
    Shape: ShapePaperDetals;
    constructor(p:number, s:ShapePaperDetals){
      this.PaperId = p;
      this.Shape = s;
    }
  }

export class PaperModel{
    PaperId: number;
    PaperName:string;
    PaperTypeValue: PaperTypeModel;
    LastDeal:string;
    LastRate:number;
    LastRatePercent:number;
    Amount :number;
    DateIssue: Date;
    RateBuy: number;
    Ratesell: number;

  }



