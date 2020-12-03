import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumericInteger]'
})
export class OnlyNumericIntegerDirective {

  constructor() { }
  
  @HostListener("keypress", ['$event']) keypress(evt) {

    let key = evt.key;
   
    switch (evt.keyCode) {
      case 8:  // Backspace
      case 9:  // Tab
      case 13: // Enter
      case 37: // Left
      case 38: // Up
      case 39: // Right
      case 40: // Down
      return;
      // default:
      
      }
        //let regexp = /^[א-ת\s]+$/g;
        let regexp = /^(0|[1-9][0-9]*)$/g;
      let res = regexp.test(key);
      if (!res) {
          evt.preventDefault();
       }
    
  }
}
