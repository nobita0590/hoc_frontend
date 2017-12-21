import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
declare var MathJax: any;
@Directive({
  selector: '[appMathJax]'
})
export class MathJaxDirective implements OnChanges {
  @Input('MathJax') fractionString: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.fractionString;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.el.nativeElement]);
  }
}
