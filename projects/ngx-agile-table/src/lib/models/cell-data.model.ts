/**
 * Created by romeo on 24/10/2021.
 */

export class CellData {
  value: string;
  researchData: string; // Data to use on search
  original: any;

  constructor(value?: string, researchData?: string, original?: any) {
    this.value = value || '';
    this.researchData = researchData || this.value;
    this.original = original;
  }
  static valueOf(obj: any): CellData {
    const cellData = new CellData();
    if (obj) {
      if (obj.value !== null && obj.value !== undefined) {
        cellData.value = obj.value || '';
      }
      if (obj.researchData !== null && obj.researchData !== undefined) {
        cellData.researchData = obj.researchData || cellData.value;
      }
      if (obj.original !== null && obj.original !== undefined) {
        cellData.original = obj.original;
      }
    }
    return cellData;
  }

  researchDataValue(value: string): CellData {
    this.researchData = value;
    return this;
  }
}
