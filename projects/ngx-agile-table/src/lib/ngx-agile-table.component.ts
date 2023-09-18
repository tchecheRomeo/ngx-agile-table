import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActionButtonTable} from './models/action-button-table.model';
import {ColumnTable} from './models/column-table.model';
import {NgxAgileTableService} from './ngx-agile-table.service';
import {RowTable} from './models/row-table.model';
import {CellData} from './models/cell-data.model';


class RowData {
  originalData: any;
  displayData: any;

  constructor(originalData: any, displayData: any) {
    this.originalData = originalData;
    this.displayData = displayData;
  }
}

class Row {
  data: any;
  actionButtons: ActionButtonTable[] = [];
  collapsedActionButtons: ActionButtonTable[] = [];
}

@Component({
  selector: 'ngx-table',
  templateUrl: './ngx-agile-table.component.html',
  styleUrls: ['./ngx-agile-table.component.scss']
})
export class NgxAgileTableComponent implements OnInit, OnChanges {

  @Input()
  actionButtons: ActionButtonTable[] = [];
  @Input()
  collapseActionButton: ActionButtonTable = new ActionButtonTable('collapse', '...');
  @Input()
  columnSettings: ColumnTable[] = [];
  @Input()
  data: any[] = [];
  @Input()
  emptyText: string = 'No content';
  @Input()
  actionButtonTitle: string = '';
  @Input()
  searchText: string = 'Search';
  @Input()
  maxSizeText: string = 'Max size';
  @Input()
  totalElementsText: string = 'Total Elements';
  @Input()
  paginationPreviousText: string = '<<';
  @Input()
  paginationNextText: string = '>>';
  @Input()
  paginationPreviousIcon: string = '';
  @Input()
  paginationNextIcon: string = '';

  @Input()
  displayGlobalSearchInput: boolean = false;

  @Input()
  colorVariationLineBreak: number = 2;

  @Input()
  maxActionButtonPerRow: number = 3;

  @Input()
  collapseActionButtonPosition: string = 'right';

  @Input()
  height: string = '';

  @Input()
  totalElements: number = 0;

  @Input()
  totalPages: number = 0;

  @Input()
  elementPerPage: number = 0;

  @Input()
  elementPerPageList: number[] = [];

  @Input()
  enableColumnFiltering: boolean = true;

  @Input()
  enableColumnSorting: boolean = true;

  @Input()
  localPagination: boolean = false;

  @Output()
  onClickActionButton: EventEmitter<ActionButtonTable> = new EventEmitter();

  @Output()
  onPageChanged: EventEmitter<number> = new EventEmitter();

  @Output()
  onElementPerPageChanged: EventEmitter<number> = new EventEmitter();

  @Output()
  onGlobalSearchRequest: EventEmitter<string> = new EventEmitter();

  @Output()
  onRowDisplayed: EventEmitter<RowTable> = new EventEmitter();

  pageSelected: number = 1;
  collapseActionButtonPositions: string[] = ['right', 'bottom'];

  pagesRangeLimit = 5;
  pageStart = 1;
  globalSearchKeywords = '';

  columnSearchKeyword = '';
  columnSearch: ColumnTable = new ColumnTable('');

  columnSortDirectionAsc = false;
  columnSort: ColumnTable = new ColumnTable('');
  rows: Row[] = [];
  rowsToDisplay: Row[] = [];

  constructor() {
  }


  ngOnInit() {
    if (!this.data) { // Value passed is null
      this.data = [];
    }

    if (this.totalElements === 0 && this.data.length !== 0) {
      this.totalElements = this.data.length;
    }

    if (!this.elementPerPage) {
      this.elementPerPage = this.data.length;
    }

    this.displayData();
  }

  formatRows() {
    const rows: Row[] = [];
    let row: Row;
    let canDisplayButton: boolean;

    for (const dt of this.data) {
      row = new Row();

      row.data = dt;
      row.actionButtons = [];
      row.collapsedActionButtons = [];

      for (const actionButton of this.actionButtons) {
        canDisplayButton = actionButton.displayConditionFn(
          this.data.find(d => JSON.stringify(dt) === JSON.stringify(d))
        );

        if (canDisplayButton) {
          if ( this.actionButtons.length <= this.maxActionButtonPerRow || 
               row.actionButtons.length < this.maxActionButtonPerRow - 1) { // -1 for collapse button
            row.actionButtons.push(actionButton);
          } else {
            row.collapsedActionButtons.push(actionButton);
          }
        }
        if (row.collapsedActionButtons.length !== 0 &&
          (row.actionButtons.length + row.collapsedActionButtons.length) <= this.maxActionButtonPerRow) {
          row.actionButtons = row.actionButtons.concat(row.collapsedActionButtons);
          row.collapsedActionButtons = [];
        }
      }
      rows.push(row);
    }
    this.rows = rows;
  }

  ngOnChanges(changes: any): void {
    if (changes.data) {
      this.data = changes.data.currentValue;
    }
    if (changes.actionButtons) {
      this.actionButtons = changes.actionButtons.currentValue;
    }
    if (changes.collapseActionButton) {
      this.collapseActionButton = changes.collapseActionButton.currentValue;
    }
    if (changes.collapseActionButtonPosition) {
      this.collapseActionButtonPosition = changes.collapseActionButtonPosition.currentValue;
    }
    if (changes.maxActionButtonPerRow) {
      this.maxActionButtonPerRow = changes.maxActionButtonPerRow.currentValue;
    }
    if (changes.totalElements) {
      this.totalElements = changes.totalElements.currentValue;
    }
    if (changes.totalPages) {
      this.totalPages = changes.totalPages.currentValue;
    }
    if (changes.elementPerPage) {
      this.elementPerPage = changes.elementPerPage.currentValue;
    }
    if (changes.height) {
      this.height = changes.height.currentValue;
    }
    if (changes.columnSettings) {
      this.columnSettings = changes.columnSettings.currentValue;
    }
    if (changes.colorVariationLineBreak) {
      this.colorVariationLineBreak = changes.colorVariationLineBreak.currentValue;
    }
    if (changes.displayGlobalSearchInput) {
      this.displayGlobalSearchInput = changes.displayGlobalSearchInput.currentValue;
    }
    if (changes.elementPerPageList) {
      this.elementPerPageList = changes.elementPerPageList.currentValue;
    }
    if (changes.localPagination) {
      this.localPagination = changes.localPagination.currentValue;
    }
    if (changes.enableColumnFiltering) {
      this.enableColumnFiltering = changes.enableColumnFiltering.currentValue;
    }
    if (changes.enableColumnSorting) {
      this.enableColumnSorting = changes.enableColumnSorting.currentValue;
    }
    if (changes.emptyText) {
      this.emptyText = changes.emptyText.currentValue;
    }
    if (changes.maxSizeText) {
      this.maxSizeText = changes.maxSizeText.currentValue;
    }
    if (changes.totalElementsText) {
      this.totalElementsText = changes.totalElementsText.currentValue;
    }
    if (this.elementPerPageList && this.elementPerPage) {
      if (this.elementPerPageList.length === 0) {
        this.elementPerPageList = [this.elementPerPage, 20, 50, 100, 200];
      }
      if (this.elementPerPageList.indexOf(this.elementPerPage) === -1) {
        this.elementPerPageList.push(this.elementPerPage);
      }
      this.elementPerPageList.sort((a, b) => a < b ? -1 : 1);
    }

    this.displayData();
  }

  displayData() {
    this.formatRows();

    if (this.localPagination) {
      this.totalPageCalculation();
      this.rowsToDisplay = this.segmentation(1);
    } else {
      let rows:Row[] = [];
      this.rowsToDisplay = rows.concat(this.rows);
    }
  }

  totalPageCalculation(data?: any[]) {
    data = data ? data : this.rows;

    if (data) {
      this.totalPages = data.length / this.elementPerPage;
      if ((data.length % this.elementPerPage) !== 0 || this.totalPages === 0) {
        this.totalPages++;
      }
    }
  }

  resetTotalPages(data?: any[]) {
    this.pageSelected = 1;
    this.pageStart = 1;
    if (this.localPagination) {
      this.totalPageCalculation(data);
    }
  }

  segmentation(page: number, data?: any[]): Row[] {
    data = data ? data : this.rows;

    if (data) {
      if (this.totalPages === 0) {
        return data;
      } else {
        if (page === 1) {
          return data.slice(0, this.elementPerPage);
        } else if (data.length >= this.elementPerPage * page) {
          return data.slice((page - 1) * this.elementPerPage, page * this.elementPerPage);
        } else {
          return data.slice((page - 1) * this.elementPerPage, this.rows.length);
        }
      }
    }
    return [];
  }

  pages(): number[] {
    const result: number[] = [];
    const presumePageEnd = this.pageStart + this.pagesRangeLimit;
    const limit = presumePageEnd <= this.totalPages ? presumePageEnd - 1 : this.totalPages;
    for (let i = this.pageStart; i <= limit; i++) {
      result.push(i);
    }
    return result;
  }


  onActionButtonClicked(button: ActionButtonTable, index: number) {
    if (!this.collapseActionButton || this.collapseActionButton.key !== button.key) {
      button.targetData = this.rowsToDisplay[index].data;
      button.target = this.rows.findIndex(r => JSON.stringify(button.targetData) === JSON.stringify(r.data));
      this.onClickActionButton.emit(button);
    }
  }

  globalSearchRequest() {
    this.onGlobalSearchRequest.emit(this.globalSearchKeywords);
  }

  onPageChange(page: number) {
    if (this.localPagination) {
      if (this.columnSearchKeyword && this.columnSearchKeyword !== '') {
        this.filterTable(this.columnSearch, this.columnSearchKeyword, page);
      } else if (this.columnSort) {
        this.sortDataDisplay(this.columnSort, this.columnSortDirectionAsc, page);
      } else {
        this.rowsToDisplay = this.segmentation(page);
      }
    } else {
      this.onPageChanged.emit(page);
    }
    this.pageSelected = page;
  }

  onElementPerPageChange() {
    if (this.localPagination) {
      if (this.columnSearchKeyword && this.columnSearchKeyword !== '') {
        this.filterTable(this.columnSearch, this.columnSearchKeyword, 1);
      } else if (this.columnSort) {
        this.sortDataDisplay(this.columnSort, this.columnSortDirectionAsc, 1);
      } else {
        this.resetTotalPages();
        this.rowsToDisplay = this.segmentation(1);
      }
    } else {
      this.onElementPerPageChanged.emit(this.elementPerPage);
    }
  }

  filterTable(columnTable: ColumnTable, keyword: string, page?: number) {
    let searchResults: any[];
    if (keyword && keyword !== '') {
      searchResults = this.rows.filter(r => (this.cellDataValue(r.data, columnTable)
        .researchData + '').toLowerCase().includes(keyword.toLowerCase()));
    } else {
      searchResults = this.rows;
    }

    this.rowsToDisplay = this.segmentation(page ? page : 1, searchResults);
    this.resetTotalPages(searchResults);

    this.columnSearchKeyword = keyword;
    this.columnSearch = columnTable;
  }

  sortDataDisplay(columnTable: ColumnTable, ascFiltering: boolean, page?: number) {
    let searchResults: any[];

    if (ascFiltering) {
      searchResults = this.rows.sort((a, b) => {
        let value: any = this.cellDataValue(a.data, columnTable).researchData;
        let value2: any = this.cellDataValue(b.data, columnTable).researchData;
        value = parseFloat(value) ? parseFloat(value) : value;
        value2 = parseFloat(value2) ? parseFloat(value2) : value2;

        if (value < value2) {
          return 1;
        }
        if (value > value2) {
          return -1;
        }
        return 0;
      });
    } else {
      searchResults = this.rows.sort((a, b) => {
        let value: any = this.cellDataValue(a.data, columnTable).researchData;
        let value2: any = this.cellDataValue(b.data, columnTable).researchData;
        value = parseFloat(value) ? parseFloat(value) : value;
        value2 = parseFloat(value2) ? parseFloat(value2) : value2;

        if (value > value2) {
          return 1;
        }
        if ((value < value2)) {
          return -1;
        }
        return 0;
      });
    }

    this.rowsToDisplay = this.segmentation(page ? page : 1, searchResults);
    this.resetTotalPages(searchResults);

    this.columnSortDirectionAsc = ascFiltering;
    this.columnSort = columnTable;
  }

  sortByColumn(attr: any, sortColumnDirection: any) {
    this.sortDataDisplay(attr, sortColumnDirection.checked);
    sortColumnDirection.checked = !sortColumnDirection.checked;
  }

  nextPages() {
    if (this.pageStart + this.pagesRangeLimit - 1 < this.totalPages) {
      this.pageStart += this.pagesRangeLimit;
    }
  }

  previousPages() {
    if (this.pageStart > this.pagesRangeLimit) {
      this.pageStart -= this.pagesRangeLimit;
    }
  }

  tableDataTitleAttribute(data: any, columnTable: ColumnTable) {
    const value: string = '' + this.cellDataValue(data, columnTable).value;
    if (value.includes('<') && value.includes('>')) {
      return '';
    } else {
      return value;
    }
  }

  columnValue(data: any, columnProperty: string, sanitize?: boolean): any {
    let value;
    if (columnProperty.includes('.')) {
      let desiredValue = JSON.parse(JSON.stringify(data));
      columnProperty.split('.').forEach((element: string) => {
        if (element.includes('[') && element.includes(']')) {
          const openHookIndex = element.indexOf('[');
          const closeHookIndex = element.indexOf(']');

          desiredValue = desiredValue[element.substring(0, openHookIndex)]
            [parseInt(element.substring(openHookIndex + 1, closeHookIndex), 10)];
        } else if (desiredValue) {
          desiredValue = desiredValue[element];
        }
      });
      value = desiredValue;
    } else {
      value = data[columnProperty];
    }

    if (sanitize !== false) {
      return this.sanitize(value);
    } else {
      return (value !== null && value !== undefined ) ? value : '';
    }
  }

  cellDataValue(data: any, columnTable: ColumnTable): CellData {
    const originalValue = this.columnValue(data, columnTable.nameProperty, false);
    const customCellData: any = columnTable.customCellFn(originalValue, data);
    let cellData: CellData;
    if (customCellData) {
      if (customCellData.value) {
        cellData = CellData.valueOf(customCellData);
      } else if ((customCellData + '').length !== 0) {
        if ((originalValue + '').length !== 0) {
          cellData = new CellData((customCellData + ''), originalValue);
        } else {
          cellData = new CellData((customCellData + '')); // For custom cell who don't have original property value
        }
      } else {
        cellData = new CellData();
      }
    } else {
      cellData = new CellData(originalValue);
    }
    cellData.original = originalValue;
    return cellData;
  }

  columnDisplayValue(data: any, columnTable: ColumnTable): any {
    const cellData: CellData = this.cellDataValue(data, columnTable);
    if (cellData.value.length !== 0) { // If not default value : Default value returned by customCellFn() is empty string
      return this.sanitize(cellData.value);
    } else {
      return cellData.original;
    }
  }

  sanitize(value: any): any {
    return value ? NgxAgileTableService.getSanitizer().bypassSecurityTrustHtml(value) : '<span></span>';
  }

  displayButton(button: ActionButtonTable, index: number): boolean {
    return button.displayConditionFn(
      this.rows.find(d => JSON.stringify(this.rowsToDisplay[index].data) === JSON.stringify(d.data))
    );
  }

  getCollapsePosition(): string {
    if (this.collapseActionButtonPositions.indexOf(this.collapseActionButtonPosition) !== -1) {
      return 'collapse-' + this.collapseActionButtonPosition;
    } else {
      return 'collapse-' + this.collapseActionButtonPositions[0];
    }
  }

  getActionButtonToDisplay(data: any): ActionButtonTable[] {
    const row: any = this.rows.find(row => row.data === data);
    return row.actionButtons;
  }

  getActionButtonToCollapse(data: any) {
    const row: any = this.rows.find(row => row.data === data);
    return row.collapsedActionButtons;
  }

  rowDisplayed(data: any, nativeElement: any): string {
    this.onRowDisplayed.emit(new RowTable(data, nativeElement));
    return '';
  }

}
