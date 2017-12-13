import { Component, OnInit } from '@angular/core';
import {Build, RelatedDesign} from "../../models/build";
import {BuildService} from "../../services/build.service";
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";

@Component({
  selector: 'app-build-detail',
  templateUrl: './build-detail.component.html',
  styleUrls: ['./build-detail.component.scss']
})
export class BuildDetailComponent implements OnInit {
  build: Build;
  originalBuild: Build;
  viewMode: boolean = true;
  createMode: boolean = false;
  designs: Design[] = [];
  newDesign: Design;

  constructor(
    private buildService: BuildService,
    private designService: DesignService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.loadBuild("" + params.get('id'))).subscribe(
      build => {
        this.build = build;
        this.originalBuild = JSON.parse(JSON.stringify(build));
      }
    );
    this.getDesigns();
  }

  private loadBuild(id: string):Promise<Build>{

    return new Promise<Build>(((resolve, reject) => {
      if(id === 'new') {
        this.viewMode = false;
        this.createMode = true;
        resolve(new Build(0, "", ""));
      }else{
        this.viewMode = true;
        this.createMode = false;
        this.buildService.getBuild(id)
          .then(build => {
            resolve(build)
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      }
    }));
  }

  private getDesigns() {
    this.designService.getDesigns().subscribe(designs => {
      this.designs = designs;
      this.designs.sort((a: Design, b: Design) => {
        return a.design_id > b.design_id ? 1 : -1;
      });
    });
  }

  public notInBuild(design : Design) {
    for (let relatedDesign of this.build.relatedDesigns) {
      if (design.design_id === relatedDesign.design_id) {
        return false;
      }
    }
    return true;
  }

  public removeDesign(index : number) {
    this.build.relatedDesigns.splice(index, 1);
  }

  public addDesign(design : Design) {
    let related = new RelatedDesign();
    related.design_id = design.design_id;
    related.name = design.name;
    related.copies = 1;
    this.build.relatedDesigns.push(related);
  }

  public toggleEdit(){
    this.viewMode = !this.viewMode;
  }
  public save(){
    console.log("Saving");
    this.buildService.updateBuild(this.build)
      .then((data) => {
        this.originalBuild = JSON.parse(JSON.stringify(this.build));
        console.log("Saved data", data);
        this.viewMode = true;
      })
      .catch(err => {
        console.log("Error in updating. Inform the user somehow", err);
      });
  }
  public reset(){
    this.build = JSON.parse(JSON.stringify(this.originalBuild));
    this.viewMode = !this.createMode;
  }
  public remove(){
    this.buildService.deleteBuild(this.build)
      .then((data) => {
        console.log("deleted ", data);
        this.router.navigateByUrl('/build/new');
      });
  }
  public create(){
    this.buildService.createBuild(this.build)
      .then((data) => {
        this.build = data;
        this.originalBuild = JSON.parse(JSON.stringify(data));
        this.viewMode = true;
        this.createMode = false;

        this.router.navigateByUrl('/build/'+ this.build.build_id);
      });
  }
}

