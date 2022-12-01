import {Component, OnInit} from '@angular/core';
import {NgxAgileTableService} from "ngx-agile-table";
import {ActionButtonTable} from "ngx-agile-table";
import {ColumnTable} from "ngx-agile-table";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   buttons: ActionButtonTable[] = [];

  columns: ColumnTable[] = [
    new ColumnTable('First Name', 'firstName'),
    new ColumnTable('Last Name', 'lastName'),
    new ColumnTable('Age', 'age'),
    new ColumnTable('Country', 'address.country'),
    new ColumnTable('First P.O Box', 'address.box[0].name')
  ];

  constructor(private service: NgxAgileTableService) {

  }

  customers: any[] = [];
  totalPages: number = 5;
  elementPerPage: number = 5;
  elementPerPageList: number[] = [10, 20, 50];

  ngOnInit() {
    const deleteButton = new ActionButtonTable('delete', 'Delete');

    deleteButton.displayCondition((data) => {
      return data.age % 5 === 0;
    });

    this.buttons = [
      new ActionButtonTable('edit', 'Edit'),
      deleteButton
    ];

    let fakeCustomers = [];
    for (let i = 1; i <= 100; i++) {
      fakeCustomers.push({
        firstName: 'Romeo ' + i,
        lastName: '<strong>' + 'Klaus ' + i + '</strong>',
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
  }

  onActionButtonClicked(actionButton: ActionButtonTable) {
    switch (actionButton.key) {
      case 'edit':
        alert('Trying to edit : ' + actionButton.targetData.firstName);
        break;
      case 'delete':
        alert('Trying to delete : ' + actionButton.targetData.firstName);
        break;
      default:
        alert('Action button "' + actionButton.key + '" not implemented');
        break;
    }
  }
}
