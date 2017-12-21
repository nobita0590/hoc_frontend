import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CommonHelperModule } from '../app/common-helper.module';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { ToastyModule } from 'ng2-toasty';

import { FrondtendLayoutComponent } from './layouts/frondtend-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginModalComponent } from './layouts/login-modal.component';

import { FrontRoutingModule } from './front.routing';
import { ItemModule } from './item/item.module';

@NgModule({
  declarations: [
    FrondtendLayoutComponent, HomeComponent, LoginModalComponent
  ],
  entryComponents: [LoginModalComponent],
  imports: [
    ItemModule,
    BrowserModule,
    CommonHelperModule,
    FrontRoutingModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    ToastyModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [{
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    Title
  ],
  bootstrap: [FrondtendLayoutComponent]
})
export class FrontModule { }
