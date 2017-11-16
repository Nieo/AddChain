import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  currentProjectID : string;
  sub: any;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getProjects();
      this.currentProjectID = params['id'];
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getProjects(){
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.projects.sort((a: Project, b: Project) => {
        return a.project_id > b.project_id ? 1 : -1;
      });
    });
  }

}
