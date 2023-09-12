import {CellData} from './cell-data.model';
/**
 * Created by romeo on 24/10/2021.
 */

export class ColumnTable {
  title: string;
  nameProperty: string; // Name of property in data list
  display: boolean;
  width: string;
  customCellFn: (cellData: any, data?: any) => CellData | string | number;

  constructor(title: string, nameProperty?: string, display?: boolean, width?: string) {
    this.title = title;
    this.nameProperty = nameProperty || title;
    this.display = display == null ? true : display;
    this.width = width || '';
    this.customCellFn = (data, cellData) => '';
  }

  titleValue(value: string): ColumnTable {
    this.title = value;
    return this;
  }

  namePropertyValue(value: string): ColumnTable {
    this.nameProperty = value || this.title;
    return this;
  }

  displayValue(value: boolean): ColumnTable {
    this.display = value == null ? true : value;
    return this;
  }

  widthValue(value: string): ColumnTable {
    this.width = value || '';
    return this;
  }

  customCell(cellDefinition: (cellData: any, data?: any) => CellData | string | number): ColumnTable {
    this.customCellFn = cellDefinition;
    return this;
  }
}
