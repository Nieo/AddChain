import { Component, OnInit } from '@angular/core';
import {Build} from "../../models/build";
import {BuildService} from "../../services/build.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {
  builds: Build[];
  currentBuildID : number;
  sub: any;
  constructor(
    private buildService: BuildService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getBuilds();
      this.currentBuildID = +params['id'];
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getBuilds(){
    this.buildService.getBuilds().subscribe(builds => {
      this.builds = builds;
      this.builds.sort((a: Build, b: Build) => {
        return a.build_id > b.build_id ? 1 : -1;
      });
    });
  }

}
