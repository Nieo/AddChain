import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DesignComponent } from './components/design/design.component';
import { HttpModule } from "@angular/http";
import { DesignService } from "./services/design.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectComponent } from './components/project/project.component';
import { PrintComponent } from './components/print/print.component';
import { PartComponent } from './components/part/part.component';
import { BuildDetailComponent } from './components/build-detail/build-detail.component';


const appRoutes: Routes = [
  {path: "",  redirectTo: "project", pathMatch: "full"},
  {path: "project", component: ProjectComponent},
  {path: "design", component: DesignComponent },
  {path: "build", component: BuildDetailComponent },
  {path: "print", component: PrintComponent },
  {path: "part", component: PartComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    DesignComponent,
    NavbarComponent,
    ProjectComponent,
    PrintComponent,
    PartComponent,
    BuildDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [ DesignService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
