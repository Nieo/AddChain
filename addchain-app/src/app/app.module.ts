import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DesignComponent } from './components/design/design.component';
import {HttpModule} from "@angular/http";
import {DesignService} from "./services/design.service";

@NgModule({
  declarations: [
    AppComponent,
    DesignComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ DesignService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
