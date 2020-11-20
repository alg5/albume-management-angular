
export class UserModel {
    Id :number;
    Name: string;
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
    IssueYeard: number;
    NameArtist:string;
    SexArtist: SexArtistEnum;
    Picture: FileModel;
    Owner: UserModel;
}
export enum SexArtistEnum {
    Male= 1,
    Female,
}