import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule,JsonpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// import { CustomFormsModule } from 'ng2-validation'
import { HttpClientModule } from '@angular/common/http';

import $ from "jquery";
import { SearchServiceService } from './search-service.service';


const appRoutes:Routes=[
  
  
]






@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // CustomFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    SearchServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
