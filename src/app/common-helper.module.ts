import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShowErrorsComponent } from './shared/show-errors.component';
import { BlockTemplateComponent } from './shared/block-template.component';
import { PagingComponent } from '../front/service';
import { AppComponent } from './app.component';

/*@NgModule({
  imports: [],
  exports: []
})*/
 @NgModule({
   imports: [
     CommonModule, RouterModule
   ],
   declarations: [
     ShowErrorsComponent,
     BlockTemplateComponent,
     PagingComponent,
     AppComponent
   ],
   exports: [CommonModule, ShowErrorsComponent, PagingComponent, AppComponent],
   entryComponents: [
     BlockTemplateComponent // Make sure to add it to the entry components
   ],
   providers: [
     // FlashAlert
   ],
 })
export class CommonHelperModule {}
