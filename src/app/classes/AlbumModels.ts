
export class UserModel {
    Id :number;
    Login: string;
    Name: string;
    Password: string;
    Salt:string;
    IssueYearPreferenceFilter: number;
    IssueYearPreferenceSort: number;
    NameArtistPreferenceFilter: string;
    NameArtistPreferenceSort: number;

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
    GenresDesc: string;
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
    RockMusic = "Rock music",
    ElectronicMusic = "Electronic music",
    SoulMusic = "Soul music/R&B",
    Funk = "Funk",
    CountryMusic = "Country music",
    LatinMusic = "Latin music",
    Reggae = "Reggae",
    HipHopMusic = "Hip hop music",
    Polka = "Polka"
}