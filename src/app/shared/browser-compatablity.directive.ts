import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBrowserCompatablity]'
})
export class BrowserCompatablityDirective {

  constructor(el: ElementRef) {
    if(navigator.userAgent.indexOf("Firefox") != -1 )
    {
      console.log("this is firefox")
      el.nativeElement.style.border = '1px';
      el.nativeElement.style.borderStyle = 'solid'
      el.nativeElement.style.borderStyle = 'solid'
    }
    else {
      console.log("this is not firefox");
    }
  }


}
