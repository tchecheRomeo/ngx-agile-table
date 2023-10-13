import { NgModule } from '@angular/core';
import { NgxAgileTableComponent } from './ngx-agile-table.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxAgileTableService} from './ngx-agile-table.service';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [
    NgxAgileTableComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
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
