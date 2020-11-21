
export class UserModel {
    Id :number;
    Name: string;
    IssueYearPreferenceFilter: number;
    IssueYearPreferenceSort: number;
    NameArtistPreferenceFilter: string;
    NameArtistPreferenceSort: number;
    Password: string;
}
export class FileModel {
    Id :number;
    Name: string;
    Path: string;    
}

export class AlbumModel {
    Id: number;
    Caption:string;
    IssueYear: number;
    NameArtist:string;
    Genres: GenresEnum;
    Picture: FileModel;
    Owner: UserModel;

}
export class NameId {
    Id: number;
    Name:string;
  }
  
  export class NameIdString {
    Id: string;
    Name:string;
  }
export enum GenresEnum {
    RockMusic = 1,
    ElectronicMusic,
    SoulMusic,
    Funk,
    CountryMusic,
    LatinMusic,
    Reggae,
    HipHopMusic,
    Polka
}