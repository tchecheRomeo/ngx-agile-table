import {Component, OnInit, Renderer2} from '@angular/core';
import {ActionButtonTable, ColumnTable, RowTable} from 'ngx-agile-table';
import {CellData} from '../../projects/ngx-agile-table/src/lib/models/cell-data.model';
import {DecimalPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {GithubService} from "./github.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {

  customerColumns: ColumnTable[] = [
    new ColumnTable('column.first_name', 'firstName'),
    new ColumnTable('column.last_name', 'lastName'),
    new ColumnTable('column.age', 'age'),
    new ColumnTable('column.country', 'address.country'),
    new ColumnTable('column.first_po_box', 'address.box[0].name')
  ];

  repositoriesColumns: ColumnTable[] = [
    new ColumnTable('column.date', 'created_at').customCell(data => {
        const value = ('' + data).replace('T', ' ').replace('Z', '');
        return new CellData(value, value);
      }),
    new ColumnTable('column.git_owner', 'owner.login'),
    new ColumnTable('column.git_name', 'name').customCell((cellData, data) => {
        return new CellData('<a href="' + data.html_url + '" target="_blank">' + cellData + '</a>', cellData);
      }),
    new ColumnTable('column.description', 'description')
  ];

  actionButtons: ActionButtonTable[] = [
    new ActionButtonTable('delete', 'button.delete')
      .displayCondition((data) => data.amount % 300 === 0)
      .iconValue('/assets/icons/trash.png').cssValue('delete-bg'),
    //  .htmlValue('<img class="delete-bg" src="/assets/icons/trash.png" alt="Image">'),
    new ActionButtonTable('valid', 'button.valid')
      .htmlValue('<img class="green-bg" src="/assets/icons/confirm.png" alt="Image">'),
    new ActionButtonTable('reject', 'button.reject')
      .htmlValue('<img class="red-bg" src="/assets/icons/discard.png" alt="Image">'),
    new ActionButtonTable('edit', 'button.edit')
      .htmlValue('<img class="edit-bg" src="/assets/icons/edit.png" alt="Image">'),
    new ActionButtonTable('see', 'button.see')
      .htmlValue('<img class="edit-bg" src="/assets/icons/eyes.png" alt="Image">'),
    new ActionButtonTable('retry', 'button.retry'),
    new ActionButtonTable('cancel', 'button.cancel')

  ];

  transactionColumns: ColumnTable[] = [
      new ColumnTable('column.date', 'date'),
      new ColumnTable('column.customer_name', 'customerName'),
      new ColumnTable('column.customer_gender', 'customerMale').customCell(data => {
        const value = data ? this.translate.instant('text.male') : this.translate.instant('text.female');
        return new CellData('<mark>' + value + '</mark>', value);
      }),
      new ColumnTable('column.beneficiary_name', 'beneficiaryName'),
      new ColumnTable('column.amount', 'amount').customCell(data => {
        const value:any = this.decimalPipe.transform(data, '3.');
        return new CellData('<strong>' + value + '</strong>', value);
      }),
      new ColumnTable('column.fees', 'fees').customCell((cellData, data) => data.amount * 20 / 100),
      new ColumnTable('column.status', 'status').customCell(data => {
        if (data === this.failStatus) {
          return '<div style="display: flex; justify-content: center;">' +
            '<div style="background-color: red;height: 20px;width: 20px"></div>' +
            '</div>';
        } else if (data === this.successStatus) {
          return '<div style="display: flex; justify-content: center;">' +
            '<div style="background-color: green;height: 20px;width: 20px"></div>' +
            '</div>';
        } else {
          return data;
        }
      })
    ];

  constructor(private renderer: Renderer2, private decimalPipe: DecimalPipe,
              private translate: TranslateService, private githubService: GithubService) {
    translate.addLangs(['en', 'fr']);
    const browserLang: string = '' + translate.getBrowserLang();
    this.lang = browserLang.match(/en|fr/) ? browserLang : 'en';
    // translate.setDefaultLang(this.lang);
    translate.use(this.lang);

  }

  customers: any[] = [];
  repositories: any[] = [];
  repositoriesPage: number = 1;
  repositoriesSize: number = 20;
  repositoriesTotal: number = 0;
  repositoriesTotalPages: number = 0;
  repositoriesSearchText: string = 'angular';

  transactions: never[] = [];
  totalPages: number = 5;
  elementPerPage: number = 5;
  elementPerPageList: number[] = [10, 20, 50, 100];
  totalCustomers = 10;
  totalTransactions = 100;

  maxActionButtonPerRow = 3;
  enableColumnSorting = false;
  enableColumnFiltering = false;
  localPagination = false;
  dangerousAmountMin = 3000;
  dangerousAmountMax = 10000;

  collapseButtonPosition = 'default';
  successStatus = 'success';
  failStatus = 'fail';
  lang = 'en';

  ngOnInit() {
    const fakeCustomers = [];
    for (let i = 1; i <= this.totalCustomers; i++) {
      fakeCustomers.push({
        firstName: 'Romeo ' + i,
        lastName: 'Klaus ' + i,
        age: 5 + i,
        address: {
          country: 'Contry ' + i,
          city: 'City ' + i,
          box: [
            {
              name: 'P.O box : ' + i,
              code: (i * 7)
            },
            {
              name: 'P.O box : ' + (i * 2),
              code: (i * 4)
            }
          ]
        }
      });
    }

    this.customers = fakeCustomers;
    this.loadGithubRepositories();

    const fakeTransactions:any = [];
    for (let i = 1; i <= this.totalTransactions; i++) {
      fakeTransactions.push({
        customerName: 'Romeo ' + i,
        beneficiaryName: 'Klaus ' + i,
        date: new Date().toISOString().replace('T', ' ').replace('Z', ''),
        amount: Math.floor(10 * Math.random() + 1) * 500,
        status: Math.floor(10 * Math.random()) % 2 === 0 ? this.successStatus : this.failStatus,
        customerMale: Math.floor(10 * Math.random()) % 4 === 0
      });
    }

    this.transactions = fakeTransactions;
  }

  private loadGithubRepositories() {
    this.githubService.searchRepos(this.repositoriesPage, this.repositoriesSize, this.repositoriesSearchText)
      .subscribe({
        next: (res) => {
          this.repositories = res.data;
          this.repositoriesTotal = res.total;
          this.repositoriesTotalPages = this.repositoriesTotal / this.repositoriesSize;
        },
        error: () => {

        }
      });
  }

  onSearch(text: string) {
    this.repositoriesSearchText = text;
    this.repositoriesPage = 1;

    this.loadGithubRepositories();
  }

  pageChange(value: number) {
    this.repositoriesPage = value;
    this.loadGithubRepositories();
  }

  elementPerPageChange(value: number) {
    this.repositoriesPage = 1;
    this.repositoriesSize = value;

    this.loadGithubRepositories();
  }

  onActionButtonClicked(actionButton: ActionButtonTable) {
    switch (actionButton.key) {
      case 'edit':
        alert(this.translate.instant('alert.edit_customer') + ' : ' + actionButton.targetData.customerName);
        break;
      case 'delete':
        alert(this.translate.instant('alert.delete_customer') + ' : ' + actionButton.targetData.customerName);
        break;
      default:
        alert(this.translate.instant('alert.action_button_not_implement') + ' : ' + actionButton.key);
        break;
    }
  }

  onRowDisplayed(row: RowTable) {
    // Manipulate via Renderer2
    if (this.dangerousAmountMin <= row.data.amount && row.data.amount <= this.dangerousAmountMax) {
      this.renderer.addClass(row.nativeElement, 'row-danger');
    }
  }

  changeLanguage() {
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
  }
}
