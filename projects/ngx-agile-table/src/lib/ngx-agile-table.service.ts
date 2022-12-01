import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class NgxAgileTableService {

  static sanitizer: DomSanitizer;

  constructor(domSanitizer: DomSanitizer) {
    NgxAgileTableService.sanitizer = domSanitizer;
  }

  static getSanitizer(): DomSanitizer {
    return this.sanitizer;
  }
}
