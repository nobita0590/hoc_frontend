import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course/course.component';
import { NewsItemComponent } from './news/news-item.component';
import { NewsHightlightItemComponent } from './news/news-hightlight-item.component';
import { FagsBannerComponent } from './fags/fags-banner.component';
import { FagsItemComponent } from './fags/fags-item.component';
import { FagsHotItemComponent } from './fags/fags-hot-item.component';
import { MathJaxDirective } from './mathjax.directive';
import { TopExamComponent } from './exam/top-exam.component';
import { DocItemComponent } from './docs/doc-item.component';
import { FagsNewItemComponent } from './fags/fags-new-item.component';

@NgModule({
 imports: [
   CommonModule, RouterModule
 ],
 declarations: [
   FagsNewItemComponent,
   CourseItemComponent,
   NewsItemComponent,
   NewsHightlightItemComponent,
   FagsBannerComponent,
   FagsItemComponent,
   FagsHotItemComponent,
   MathJaxDirective,
   TopExamComponent,
   DocItemComponent
 ],
 exports: [
   FagsNewItemComponent,
   CourseItemComponent,
   NewsItemComponent,
   NewsHightlightItemComponent,
   FagsBannerComponent,
   FagsItemComponent,
   FagsHotItemComponent,
   MathJaxDirective,
   TopExamComponent,
   DocItemComponent
 ],
 entryComponents: [
   // BlockTemplateComponent // Make sure to add it to the entry components
 ],
 providers: [
   // FlashAlert
 ],
})
export class ItemModule {}
