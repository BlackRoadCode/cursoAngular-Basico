import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  @Input("appResaltado") nuevoColor: string;

  constructor(private _elementRef: ElementRef) {
    console.log("Directiva resaltado");

    //_elementRef.nativeElement.style.backgroundColor = "yellow";
  }

  @HostListener('mouseenter') mouseEntro() {
    this._elementRef.nativeElement.style.backgroundColor = this.nuevoColor;
  }

  @HostListener('mouseleave') mouseSalio() {
    this._elementRef.nativeElement.style.backgroundColor = null;
  }

}
