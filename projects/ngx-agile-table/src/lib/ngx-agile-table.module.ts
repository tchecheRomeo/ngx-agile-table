import { NgModule } from '@angular/core';
import { NgxAgileTableComponent } from './ngx-agile-table.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxAgileTableService} from './ngx-agile-table.service';



@NgModule({
  declarations: [
    NgxAgileTableComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    NgxAgileTableComponent
  ],
  providers: [
    NgxAgileTableService
  ]
})
export class NgxAgileTableModule {
  constructor(private ngxAgileTableService: NgxAgileTableService) {  }
}
