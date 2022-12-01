import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActionButtonTable} from './models/action-button-table.model';
import {ColumnTable} from './models/column-table.model';
import {NgxAgileTableService} from './ngx-agile-table.service';

@Component({
  selector: 'ngx-table',
  templateUrl: './ngx-agile-table.component.html',
  styleUrls: ['./ngx-agile-table.component.scss']
})
export class NgxAgileTableComponent implements OnInit {

  @Input()
  actionButtons: ActionButtonTable[] = [];
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
  height: string = '';

  @Input()
  totalElements: number = 0;

  @Input()
  totalPages: number = 0;

  @Input()
  elementPerPage: number = 10;

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

  pageSelected: number = 1;
  dataToDisplay: any[] = [];

  pagesRangeLimit = 5;
  pageStart = 1;
  globalSearchKeywords = '';

  constructor() {
  }


  ngOnInit() {
    if (!this.data) { // Value passed is null
      this.data = [];
    }

    if (this.totalElements === 0 && this.data.length !== 0) {
      this.totalElements = this.data.length;
    }

    this.displayData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.data = changes['data'].currentValue;
    }
    if (changes['actionButtons']) {
      this.actionButtons = changes['actionButtons'].currentValue;
    }
    if (changes['totalElements']) {
      this.totalElements = changes['totalElements'].currentValue;
    }
    if (changes['totalPages']) {
      this.totalPages = changes['totalPages'].currentValue;
    }
    if (changes['elementPerPage']) {
      this.elementPerPage = changes['elementPerPage'].currentValue;
    }
    if (changes['height']) {
      this.height = changes['height'].currentValue;
    }
    if (changes['columnSettings']) {
      this.columnSettings = changes['columnSettings'].currentValue;
    }
    if (changes['colorVariationLineBreak']) {
      this.colorVariationLineBreak = changes['colorVariationLineBreak'].currentValue;
    }
    if (changes['displayGlobalSearchInput']) {
      this.displayGlobalSearchInput = changes['displayGlobalSearchInput'].currentValue;
    }
    if (changes['elementPerPageList']) {
      this.elementPerPageList = changes['elementPerPageList'].currentValue;
    }
    if (changes['localPagination']) {
      this.localPagination = changes['localPagination'].currentValue;
    }
    if (changes['enableColumnFiltering']) {
      this.enableColumnFiltering = changes['enableColumnFiltering'].currentValue;
    }
    if (changes['enableColumnSorting']) {
      this.enableColumnSorting = changes['enableColumnSorting'].currentValue;
    }
    if (changes['emptyText']) {
      this.emptyText = changes['emptyText'].currentValue;
    }
    if (changes['maxSizeText']) {
      this.maxSizeText = changes['maxSizeText'].currentValue;
    }
    if (changes['totalElementsText']) {
      this.totalElementsText = changes['totalElementsText'].currentValue;
    }
    if (this.elementPerPageList.length === 0) {
      this.elementPerPageList = [this.elementPerPage, 20, 50, 100, 200];
    }
    if (this.elementPerPageList.indexOf(this.elementPerPage) == -1) {
      this.elementPerPageList.push(this.elementPerPage);
    }
    this.elementPerPageList.sort((a, b) => a < b ? -1 : 1);

    this.displayData();
  }

  displayData() {
    if (this.localPagination) {
      this.totalPageCalculation();
    }

    if (this.localPagination) {
      this.dataToDisplay = this.segmentation(1)
    } else {
      this.dataToDisplay = (< any[]> []).concat(this.data);
    }
  }

  totalPageCalculation() {
    if (this.data) {
      this.totalPages = this.data.length / this.elementPerPage;
      if ((this.data.length % this.elementPerPage) !== 0 || this.totalPages === 0) {
        this.totalPages++;
      }
    }
  }

  segmentation(page: number): any[] {
    if (this.data) {
      if (page === 1) {
        return this.data.slice(0, this.elementPerPage);
      }
      else if (this.data.length >= this.elementPerPage * page) {
        return this.data.slice((page - 1) * this.elementPerPage, page * this.elementPerPage);
      }
      else {
        return this.data.slice((page - 1) * this.elementPerPage, this.data.length);
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
    button.targetData = this.dataToDisplay[index];
    button.target = this.data.findIndex(d => JSON.stringify(button.targetData) === JSON.stringify(d));
    this.onClickActionButton.emit(button);
  }

  globalSearchRequest() {
    this.onGlobalSearchRequest.emit(this.globalSearchKeywords);
  }

  onPageChange(page: number) {
    if (this.localPagination) {
      this.dataToDisplay = this.segmentation(page);
    } else {
      this.onPageChanged.emit(page);
    }
    this.pageSelected = page;
  }

  onElementPerPageChange() {
    if (this.localPagination) {
      this.totalPageCalculation();
      this.dataToDisplay = this.segmentation(1);
    } else {
      this.onElementPerPageChanged.emit(this.elementPerPage);
    }
  }

  filterTable(attr: any, input: any) {
    const keyword: string = input.value;
    if (keyword && keyword !== '') {
      this.dataToDisplay = this.data.filter(d => (this.columnValue(d, attr) + '').toLowerCase().includes(keyword.toLowerCase()));
    } else {
      this.dataToDisplay = this.data;
    }
  }

  sortByColumn(attr: any, sortColumnDirection: any) {
    if (sortColumnDirection.checked) {
      this.dataToDisplay = this.data.sort((a, b) => {
        if (this.columnValue(a, attr) < this.columnValue(b, attr)) {
          return 1;
        }
        if ((this.columnValue(a, attr) > this.columnValue(b, attr))) {
          return -1;
        }
        return 0;
      });
    } else {
      this.dataToDisplay = this.data.sort((a, b) => {
        if (this.columnValue(a, attr) > this.columnValue(b, attr)) {
          return 1;
        }
        if ((this.columnValue(a, attr) < this.columnValue(b, attr))) {
          return -1;
        }
        return 0;
      });
    }
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

  /**
   * allow to disable the attribute title when a html is use in the table
   * @param data
   * @param columnProperty
   * @returns
   */
  tableDataTitleAttribute(data: any, columnProperty: string) {
    let value: string = '' + this.columnValue(data, columnProperty, false);
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
            [parseInt(element.substring(openHookIndex + 1, closeHookIndex))];
        } else if (desiredValue) {
          desiredValue = desiredValue[element];
        }
      });
      value = desiredValue;
    } else {
      value = data[columnProperty];
    }

    if (sanitize !== false) {
      return value ? NgxAgileTableService.getSanitizer().bypassSecurityTrustHtml(value) : '<span></span>';
    } else {
      return value ? value : '';
    }


  }

  displayButton(button: ActionButtonTable, index: number): boolean {
    return button.displayConditionFn(
      this.data.find(d => JSON.stringify(this.dataToDisplay[index]) === JSON.stringify(d))
    );
  }

}
