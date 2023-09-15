import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class NgxAgileTableService {

  static sanitizer: DomSanitizer;

  constructor(domSanitizer: DomSanitizer) {
    NgxAgileTableService.sanitizer = domSanitizer;
  }

  static getSanitizer(): DomSanitizer {
    return NgxAgileTableService.sanitizer;
  }
}
