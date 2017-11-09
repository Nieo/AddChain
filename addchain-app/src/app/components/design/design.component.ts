import {Component, OnInit} from '@angular/core';
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import 'rxjs/add/operator/map';


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

  constructor(
    private designService: DesignService,
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

  }

  private loadDesign(id: string):Promise<Design>{

    return new Promise<Design>(((resolve, reject) => {
      if(id === 'new') {
        this.viewMode = false;
        this.createMode = true;
        resolve(new Design(0, "", ""));
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
    this.viewMode = this.createMode? false: true;
  }
  public remove(){
    this.designService.deleteDesign(this.design)
      .then((data) => {
        console.log("deleted ", data);
        this.router.navigateByUrl('/design/new');
      });
  }
  public create(){
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


