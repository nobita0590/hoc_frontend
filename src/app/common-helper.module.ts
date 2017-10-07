import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorsComponent } from './shared/show-errors.component';
import { BlockTemplateComponent } from './shared/block-template.component';



/*@NgModule({
  imports: [],
  exports: []
})*/
 @NgModule({
   imports: [
     CommonModule
   ],
   declarations: [
     ShowErrorsComponent,
     BlockTemplateComponent
   ],
   exports: [CommonModule, ShowErrorsComponent],
   entryComponents: [
     BlockTemplateComponent // Make sure to add it to the entry components
   ],
   providers: [
     // FlashAlert
   ],
 })
export class CommonHelperModule {}
