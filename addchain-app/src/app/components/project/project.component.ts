import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: Project;
  originalProject: Project;
  viewMode: boolean = true;
  createMode: boolean = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.loadProject("" + params.get('id'))).subscribe(
      project => {
        this.project = project;
        this.originalProject = JSON.parse(JSON.stringify(project));
      }
    );

  }

  private loadProject(id: string):Promise<Project>{

    return new Promise<Project>(((resolve, reject) => {
      console.log("Id say what!? " + id);
      if(id === 'new') {
        this.viewMode = false;
        this.createMode = true;
        resolve(new Project("", "", "", ""));
      }else{
        this.viewMode = true;
        this.createMode = false;
        this.projectService.getProject(id)
          .then(project => {
            resolve(project)
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      }
    }));
  }

  public toggleEdit(){
    this.viewMode = !this.viewMode;
  }
  public save(){
    console.log("Saving");
    this.projectService.updateProject(this.project)
      .then((data) => {
        this.originalProject = data;
        console.log("Saved data", data);
        this.viewMode = true;
      })
      .catch(err => {
        console.log("Error in updating. Inform the user somehow", err);
      });
  }
  public reset(){
    this.project = JSON.parse(JSON.stringify(this.originalProject));
    this.viewMode = !this.createMode;
  }
  public remove(){
    this.projectService.deleteProject(this.project)
      .then((data) => {
        console.log("deleted ", data);
        this.router.navigateByUrl('/project/new');
      });
  }
  public create(){
    this.projectService.createProject(this.project)
      .then((data) => {
        this.project = data;
        this.originalProject = JSON.parse(JSON.stringify(data));
        this.viewMode = true;
        this.createMode = false;

        this.router.navigateByUrl('/project/'+ this.project.project_id);
      });
  }
}
