import {Component, OnInit, Renderer2} from '@angular/core';
import {ColumnTable, ActionButtonTable, RowTable} from 'ngx-agile-table';
import {CellData} from '../../projects/ngx-agile-table/src/lib/models/cell-data.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  customerColumns: ColumnTable[] = [
    new ColumnTable('First Name', 'firstName'),
    new ColumnTable('Last Name', 'lastName'),
    new ColumnTable('Age', 'age'),
    new ColumnTable('Country', 'address.country'),
    new ColumnTable('First P.O Box', 'address.box[0].name')
  ];

  actionButtons: ActionButtonTable[] = [
    new ActionButtonTable('delete', 'Delete')
      .displayCondition((data) => data.amount % 300 === 0)
      .htmlValue('<img class="delete-bg" src="/assets/icons/trash.png" alt="Image">'),
    new ActionButtonTable('valid', 'Valid')
      .htmlValue('<img class="green-bg" src="/assets/icons/confirm.png" alt="Image">'),
    new ActionButtonTable('reject', 'Reject')
      .htmlValue('<img class="red-bg" src="/assets/icons/discard.png" alt="Image">'),
    new ActionButtonTable('edit', 'Edit')
      .htmlValue('<img class="edit-bg" src="/assets/icons/edit.png" alt="Image">')
  ];

  transactionColumns: ColumnTable[] = [
    new ColumnTable('Date', 'date'),
    new ColumnTable('Customer Name', 'customerName'),
    new ColumnTable('Customer Gender', 'customerMale').customCell(data => {
      const value = data ? 'Male' : 'Female';
      return new CellData('<mark>' + value + '</mark>', value);
    }),
    new ColumnTable('Beneficiary Name', 'beneficiaryName'),
    new ColumnTable('Amount', 'amount').customCell(data => {
      const value = this.decimalPipe.transform(data, '3.');
      return new CellData('<strong>' + value + '</strong>', value);
    }),
    new ColumnTable('Fees (20% amount)', 'fees').customCell((cellData, data) => data.amount * 20 / 100),
    new ColumnTable('Status', 'status').customCell(data => {
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

  constructor(private renderer: Renderer2, private decimalPipe: DecimalPipe) {

  }

  customers: any[] = [];
  transactions: any[] = [];
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

  ngOnInit() {
    const fakeCustomers = [];
    for (let i = 1; i <= this.totalCustomers; i++) {
      fakeCustomers.push({
        firstName: 'Romeo ' + i,
        lastName: 'Klaus ' + i ,
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

    const fakeTransactions = [];
    for (let i = 1; i <= this.totalTransactions; i++) {
      fakeTransactions.push({
        customerName: 'Romeo ' + i ,
        beneficiaryName: 'Klaus ' + i ,
        date: new Date().toISOString().replace('T', ' ').replace('Z', ''),
        amount: Math.floor(10 * Math.random() + 1) * 500,
        status: Math.floor(10 * Math.random()) % 2 === 0 ? this.successStatus : this.failStatus,
        customerMale: Math.floor(10 * Math.random()) % 4 === 0
      });
    }

    this.transactions = fakeTransactions;
  }

  onActionButtonClicked(actionButton: ActionButtonTable) {
    switch (actionButton.key) {
      case 'edit':
        alert('Trying to edit transaction customer : ' + actionButton.targetData.customerName);
        break;
      case 'delete':
        alert('Trying to delete transaction customer : ' + actionButton.targetData.customerName);
        break;
      default:
        alert('Action button "' + actionButton.key + '" not implemented');
        break;
    }
  }

  onRowDisplayed(row: RowTable) {
    // Manipulate via Renderer2
    if (this.dangerousAmountMin <= row.data.amount && row.data.amount <= this.dangerousAmountMax) {
     this.renderer.addClass(row.nativeElement, 'row-danger');
    }
  }
}
