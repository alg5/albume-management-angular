export enum ShapePaperDetals {
    Row,
    Cube,
   
  }
  export enum PaperActions {
    Add,
    Expand,
}
export enum BursaEnum {
    None,
    Israel,
    Usa,
    Europe,
}

//***************************** */
export enum AlbumActions {
  Add = 1,
  Edit,
  Delete
}
export enum SortEnum {
  None = 'ללא מיון',
  Asc = 'ASC',
  Desc = 'DESC',
}
export const TOTAL: number =0;
export const TOTAL_TEXT: string = "הכול";
export const WITHOUT_SORTING: string = "ללא מיון";
export const LOCAL_STORAGE_KEY: string = "albumOwner";

export const paths = {
  auth: "auth",
  cache: "cache",
  fake: "fake",
  error: "error",
  profiler: "profiler",
  notify: "notify",
  header: "header",
  convert: "convert",
  loader: "loader",
  https: "https"
};
export enum AlertTypeEnum {
  Alert ,
  Info,
  Confirm,
  Error,
}
