import {ActionButtonTable} from './action-button-table.model';
/**
 * Created by romeo on 24/10/2021.
 */

export class RowTable {
  data: any;
  nativeElement: any;

  constructor(data: any, nativeElement?: any) {
    this.data = data;
    this.nativeElement = nativeElement;
  }
}
