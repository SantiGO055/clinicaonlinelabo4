import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCargarusuario]'
})
export class CargarusuarioDirective {

  constructor(
    private el: ElementRef
  ) {
    console.log(this.el.nativeElement);
    // this.el.nativeElement.value.backgroundColor = color;
   }
  @HostListener('click',['$event']) onMouseClick(){
    
  }

}