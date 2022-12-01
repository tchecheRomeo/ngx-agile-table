/**
 * Created by romeo on 24/10/2021.
 */

export class ColumnTable {
  title: string;
  nameProperty: string; // Name of property in data list
  display: boolean;
  width: string;

  constructor(title: string, nameProperty?: string, display?: boolean, width?: string) {
    this.title = title;
    this.nameProperty = nameProperty || title;
    this.display = display == null ? true : display;
    this.width = width || '';
  }
}
