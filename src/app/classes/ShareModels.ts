
import { AlertTypeEnum} from './enums';
export interface IDialogDataAlert {
 
    title: string;
    message:string;
    btnOkText: string;
    btnCancelText: string;
    type: AlertTypeEnum;
  }