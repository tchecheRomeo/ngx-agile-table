import { NgModule } from '@angular/core';
import { NgxAgileTableComponent } from './ngx-agile-table.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";



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
  ]
})
export class NgxAgileTableModule { }
