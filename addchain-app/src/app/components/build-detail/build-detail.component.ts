import { Component, OnInit } from '@angular/core';
import {Build} from "../../models/build";
import {BuildService} from "../../services/build.service";
import {ActivatedRoute, Router, ParamMap} from "@angular/router";

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

  constructor(
    private buildService: BuildService,
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

  public toggleEdit(){
    this.viewMode = !this.viewMode;
  }
  public save(){
    console.log("Saving");
    this.buildService.updateBuild(this.build)
      .then((data) => {
        this.originalBuild = data;
        console.log("Saved data", data);
        this.viewMode = true;
      })
      .catch(err => {
        console.log("Error in updating. Inform the user somehow", err);
      });
  }
  public reset(){
    this.build = JSON.parse(JSON.stringify(this.originalBuild));
    this.viewMode = this.createMode? false: true;
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

