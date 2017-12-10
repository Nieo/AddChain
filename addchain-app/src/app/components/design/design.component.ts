import {Component, OnInit} from '@angular/core';
import {Design, RelatedProject, RelatedBuild} from "../../models/design";
import {DesignService} from "../../services/design.service";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import 'rxjs/add/operator/map';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {BuildService} from "../../services/build.service";
import {Build} from "../../models/build";


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  design: Design;
  originalDesign: Design;
  viewMode: boolean = true;
  createMode: boolean = false;
  // The selected Project will be stored here
  relatedProject: Project;
  // The selected builds will be stored here
  relatedBuilds: Build[];

  builds : Build[];
  projects: Project[];

  constructor(
    private designService: DesignService,
    private buildService: BuildService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.loadDesign("" + params.get('id'))).subscribe(
          design => {
            this.design = design;
            this.originalDesign = JSON.parse(JSON.stringify(design));
          }
      );
      // Gets all potential projects
      this.getProjects();

      this.getBuilds();
  }
  getBuilds(){
    this.buildService.getBuilds().subscribe(builds => {
      this.builds = builds;
      this.builds.sort((a: Build, b: Build) => {
        return a.build_id > b.build_id ? 1 : -1;
      });
    });
  }
  getProjects(){
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.projects.sort((a: Project, b: Project) => {
        return a.project_id > b.project_id ? 1 : -1;
      });
      // Set default project to the first project
      this.relatedProject = this.projects[0];
    });
  }

  private loadDesign(id: string):Promise<Design>{

    return new Promise<Design>(((resolve, reject) => {
      if(id === 'new') {
        this.viewMode = false;
        this.createMode = true;
        resolve(new Design(0, "", "",[]));
      }else{
        this.viewMode = true;
        this.createMode = false;
        this.designService.getDesign(id)
          .then(design => {
            resolve(design)
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
    this.design.relatedProject = [new RelatedProject(this.relatedProject.project_id, this.relatedProject.name)];
    this.designService.updateDesign(this.design)
      .then((data) => {
        this.originalDesign = data;
        console.log("Saved data", data);
        this.viewMode = true;
      })
      .catch(err => {
        console.log("Error in updating. Inform the user somehow", err);
      });
  }
  public reset(){
    this.design = JSON.parse(JSON.stringify(this.originalDesign));
    this.viewMode = !this.createMode;
  }
  public remove(){
    this.designService.deleteDesign(this.design)
      .then((data) => {
        console.log("deleted ", data);
        this.router.navigateByUrl('/design/new');
      });

  }
  public create(){
    this.design.relatedProject = [new RelatedProject(this.relatedProject.project_id, this.relatedProject.name)];
    this.designService.createDesign(this.design)
      .then((data) => {
        this.design = data;
        this.originalDesign = JSON.parse(JSON.stringify(data));
        this.viewMode = true;
        this.createMode = false;

        this.router.navigateByUrl('/design/'+ this.design.design_id);
      });
  }
}


