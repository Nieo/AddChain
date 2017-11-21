import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { DesignComponent } from './components/design/design.component';
import { HttpClientModule } from '@angular/common/http';
import { DesignService } from "./services/design.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectComponent } from './components/project/project.component';
import { PrintComponent } from './components/print/print.component';
import { PartComponent } from './components/part/part.component';
import { BuildDetailComponent } from './components/build-detail/build-detail.component';
import { DesignListComponent } from './components/design-list/design-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { BuildListComponent } from './components/build-list/build-list.component';
import {BuildService} from "./services/build.service";
import {PrintService} from "./services/print.service";
import { PrintListComponent } from './components/print-list/print-list.component';
import {ProjectService} from "./services/project.service";
import { ProjectListComponent } from './components/project-list/project-list.component';
import {PartListComponent} from "./components/part-list/part-list.component";
import {PartService} from "./services/part.service";


const appRoutes: Routes = [
  {path: "",  redirectTo: "project", pathMatch: "full"},
  {path: "project/:id", component: ProjectComponent},
  {path: "design/:id", component: DesignComponent },
  {path: "build/:id", component: BuildDetailComponent },
  {path: "print/:id", component: PrintComponent},
  {path: "part/:id", component: PartComponent}
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
    DesignListComponent,
    SpinnerComponent,
    ViewerComponent,
    BuildListComponent,
    PrintListComponent,
    ProjectListComponent,
    PartListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    FormsModule
  ],
  providers: [ProjectService, DesignService, BuildService, PrintService, PartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
