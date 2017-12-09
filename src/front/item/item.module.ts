import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course/course.component';
import { NewsItemComponent } from './news/news-item.component';
import { NewsHightlightItemComponent } from './news/news-hightlight-item.component';
import { FagsBannerComponent } from './fags/fags-banner.component';
/*import { ShowErrorsComponent } from './shared/show-errors.component';
import { BlockTemplateComponent } from './shared/block-template.component';
import { PagingComponent } from '../front/service';*/


/*@NgModule({
  imports: [],
  exports: []
})*/
@NgModule({
 imports: [
   CommonModule, RouterModule
 ],
 declarations: [
   CourseItemComponent,
   NewsItemComponent,
   NewsHightlightItemComponent,
   FagsBannerComponent
 ],
 exports: [
   CourseItemComponent,
   NewsItemComponent,
   NewsHightlightItemComponent,
   FagsBannerComponent
 ],
 entryComponents: [
   // BlockTemplateComponent // Make sure to add it to the entry components
 ],
 providers: [
   // FlashAlert
 ],
})
export class ItemModule {}
