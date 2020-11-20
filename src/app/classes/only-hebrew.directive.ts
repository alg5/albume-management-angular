import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onlyHebrew]'
})
export class OnlyHebrewDirective {
  private fontWeight = "normal";
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
 
    // this.renderer.setStyle(this.elementRef.nativeElement, "font-weight", "bold");
    
    
   }
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
        let regexp = /^[א-ת\s]+$/g;
      let res = regexp.test(key);
      if (!res) {
          evt.preventDefault();
       }
    
  }

}


