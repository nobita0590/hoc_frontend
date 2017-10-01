import { Component, Input } from '@angular/core';


@Component({
  selector: 'block-temp',
  styles: [`
    :host {
      text-align: center;
      color: #1976D2;
    }
    .center-box {
      color: #a0cadb;
      margin: auto;
    }
  `],
  template: `
    <div class="block-ui-template">
      <div class="la-timer la-3x center-box">
        <div></div>
      </div>
      <div><strong>{{message}}</strong></div>
    </div>
    
  `
})
export class BlockTemplateComponent {

  constructor() {}
  @Input() message: string;
}
